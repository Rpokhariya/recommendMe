## 📚 recommendMe — Book Recommendation System

A simple and intelligent full-stack book recommendation app built using **React (Vite)** and **Flask**. Users can explore top 50 books or get personalized recommendations based on a book title.

---

### 🚀 Live Demo

- **Frontend (Vercel)**: [https://frontend-zeta-flax-60.vercel.app/](https://frontend-zeta-flax-60.vercel.app/)
- **Backend (Render)**:
  - [`https://backend-ebcq.onrender.com/top-books`](https://backend-ebcq.onrender.com/top-books)
  - [`https://backend-ebcq.onrender.com/recommend?book=<title>`](https://backend-ebcq.onrender.com/recommend?book=harry%20potter)

---

### 🧰 Tech Stack

| Layer    | Tech Used                           |
| -------- | ----------------------------------- |
| Frontend | React + Vite + Tailwind             |
| Backend  | Flask + Python                      |
| Data     | Pandas, NumPy, Pickle               |
| Hosting  | Vercel (frontend), Render (backend) |

---

### ✨ Features

- 🔎 Search for any book and get similar recommendations
- 📘 View a curated list of Top 50 Books
- 📸 Each book includes title, author, and cover image
- 🔁 Automatically returns to top books when input is cleared
- ⚙️ Responsive design with smooth UI

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

```bash
cd frontend
npm install
npm run dev    # for local dev
```

---

#### 🐍 3. Backend (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

### 📊 Data Sources

- `pt.pkl`, `similarity_score.pkl`, `book_info.pkl` — preprocessed using collaborative filtering
- `Books.csv` — base dataset for author/image info

---

### 📌 Notes

- Backend exposes:
  - `/top-books` → returns top 50 books
  - `/recommend?book=<title>` → returns 5 similar books
- Frontend uses Axios to consume these endpoints
- CORS enabled for local and hosted frontend

---

### 🧑‍💻 Author

Built with ❤️ by [Reena Pokhariya](https://github.com/Rpokhariya)

---

## 🪄 License

Free to use under MIT License
