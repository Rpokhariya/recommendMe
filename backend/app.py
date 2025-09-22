import os
import pickle
import gzip
import numpy as np
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as genai

# --- Vercel-Friendly Flask App Initialization ---
# This is a pure API server. It does NOT serve any static frontend files.
# Vercel's "vercel.json" file is responsible for routing frontend requests.
app = Flask(__name__)
CORS(app) # Basic CORS setup is sufficient. Vercel handles most routing.

# --- Data Loading ---
# This part is correct, as it uses relative paths, which is good for Vercel.
try:
    base_dir = os.path.dirname(os.path.abspath(__file__))

    with open(os.path.join(base_dir, 'pt.pkl'), 'rb') as f:
        pt = pickle.load(f)

    with open(os.path.join(base_dir, 'similarity_score.pkl'), 'rb') as f:
        similarity_score = pickle.load(f)

    with open(os.path.join(base_dir, 'top50_book_info.pkl'), 'rb') as f:
        book_info = pickle.load(f)

    with gzip.open(os.path.join(base_dir, "book_info.pkl.gz"), "rb") as f:
        full_book_info = pickle.load(f)

    top_book_info = {k.strip(): v for k, v in book_info.items()}
    full_book_info = {k.strip(): v for k, v in full_book_info.items()}
    print("Data loaded successfully.")

except FileNotFoundError as e:
    print(f"Error loading data files: {e}")
    # Set to empty structures so the app doesn't crash if a file is missing
    pt, similarity_score, top_book_info, full_book_info = None, None, {}, {}

# --- Google Generative AI Setup ---
model = None
try:
    # On Vercel, you must set GOOGLE_API_KEY in the Environment Variables setting.
    api_key = os.environ.get('GOOGLE_API_KEY')
    if not api_key:
        raise ValueError("GOOGLE_API_KEY environment variable not set.")
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-flash')
    print("Gemini model configured successfully.")
except Exception as e:
    print(f"Error configuring Gemini API: {e}")


# --- API Endpoints ---
# The frontend calls '/api/top-books'. Vercel routes this to our function.
# Flask inside the function just needs to handle the '/top-books' part.
@app.route('/top-books')
def get_top_books():
    if not top_book_info:
        return jsonify({"error": "Book data not loaded on the server."}), 500
    books = [{"title": title, "author": data.get("author", "Unknown Author"), "image": data.get("image", "")} for title, data in top_book_info.items()]
    return jsonify({"books": books})

@app.route('/recommend')
def recommend():
    book = request.args.get('book', '')
    if not all([pt is not None, similarity_score is not None, full_book_info]):
         return jsonify({"error": "Recommendation engine not ready on the server."}), 500

    q = book.strip().lower()
    matches = [t for t in pt.index if q in t.lower()]
    if not matches:
        return jsonify({"recommended": []})

    try:
        idx = np.where(pt.index == matches[0])[0][0]
        sims = sorted(list(enumerate(similarity_score[idx])), key=lambda x: x[1], reverse=True)[1:6]
        recommendations = []
        for i in sims:
            title = pt.index[i[0]].strip()
            info = full_book_info.get(title, {})
            recommendations.append({"title": title, "author": info.get("author", "Unknown Author"), "image": info.get("image", "")})
        return jsonify({"recommended": recommendations})
    except IndexError:
        return jsonify({"recommended": []})

@app.route('/summary', methods=['POST'])
def get_summary():
    if not model:
        return jsonify({'error': 'AI model is not configured on the server.'}), 500

    data = request.get_json()
    book_title = data.get('title')
    author = data.get('author')

    if not book_title or not author:
        return jsonify({'error': 'Book title and author are required.'}), 400

    try:
        prompt = f"Generate a short, engaging, one-paragraph summary for the book '{book_title}' by {author}."
        response = model.generate_content(prompt)
        summary = response.text.strip()
        return jsonify({'summary': summary})
    except Exception as e:
        print(f"Error during summary generation: {e}")
        return jsonify({'error': 'Failed to generate summary from the AI model.'}), 500

# The following block is NOT needed for Vercel and is removed.
# if __name__ == '__main__':
#     app.run(debug=True)
