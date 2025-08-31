## 📚 recommendMe — Book Recommendation System

An intelligent full-stack book recommendation app built using React (Vite), Flask, and the Google Gemini API. Users can explore top books, get personalized recommendations, and generate AI-powered summaries on demand.

---

### 🚀 Live Demo

- **Frontend (Vercel)**: [`https://recommendme-frontend-g30ungyek-reenas-projects-b514a9e9.vercel.app/`](https://recommendme-frontend-g30ungyek-reenas-projects-b514a9e9.vercel.app/)
- **Backend (Render)**:
  - [`https://backend-ebcq.onrender.com/top-books`](https://recommend-backend-ss6w.onrender.com/top-books)
  - [`https://backend-ebcq.onrender.com/recommend?book=<title>`](https://recommend-backend-ss6w.onrender.com/recommend?book=harry%20potter)

---

### 🧰 Tech Stack

| Layer    | Tech Used                           |
| -------- | ----------------------------------- |
| Frontend | React + Vite + Tailwind             |
| Backend  | Flask + Python                      |
| AI Model | Google Gemini API                   |
| Data     | Pandas, NumPy, Pickle               |
| Hosting  | Vercel (frontend), Render (backend) |

---

### ✨ Features

- 🔎 Search for any book and get similar recommendations
- 📘 View a curated list of Top 50 Books
- 📸 Each book includes title, author, and cover image
- 🔁 Automatically returns to top books when input is cleared
- ⚙️ Responsive design with smooth UI
- 🤖 Get a concise, AI-powered summary for any book with a single click.

---

### 🗂 Project Structure

```
recommendMe/
├── frontend/    # React app (Vite + TailwindCSS)
├── backend/     # Flask API with similarity engine
└── README.md
```

---

### 🛠️ Setup Instructions

#### 📦 1. Clone the repo

```bash
git clone https://github.com/Rpokhariya/recommendMe.git
cd recommendMe
```

---

#### 💻 2. Frontend (React)

Open the frontend/src/App.tsx file.
Make sure the API_BASE_URL constant is set for local development:
```bash
const API_BASE_URL = 'http://127.0.0.1:5000';
```
Then

```bash
cd frontend
npm install
npm run dev    # for local dev
```

---


#### 🐍 3. Set up Google Gemini API KEY(Flask)


Get your API key from Google AI Studio.
Set it as an environment variable.
```bash
On Windows: set GOOGLE_API_KEY='YOUR_API_KEY'
```

#### 🐍 4. Backend (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

### 📊 Data Sources

- `pt.pkl`, `similarity_score.pkl`, `book_info.pkl` — preprocessed using collaborative filtering
- `Books.csv` — base dataset for author/image info
- Google Gemini API — Used for generating dynamic, on-demand book summaries.

---

### 📌 Notes

- Backend exposes:
  - `GET /top-books` → returns top 50 books
  - `GET /recommend?book=<title>` → returns 5 similar books
  - `POST /summary` → Takes a book title and author in the request body and returns an AI-generated summary.
- Frontend uses Axios to consume these endpoints
- CORS enabled for local and hosted frontend

---

### 🧑‍💻 Author

Built with ❤️ by [Reena Pokhariya](https://github.com/Rpokhariya)

