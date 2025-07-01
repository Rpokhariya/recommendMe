import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BookGrid from './components/BookGrid';

type Book = {
  title: string;
  author: string;
  image: string;
};

function App() {
  const [topBooks, setTopBooks] = useState<Book[]>([]);
  const [recommendations, setRecommendations] = useState<Book[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    axios.get('https://http://127.0.0.1:5000/top-books')
      .then(res => setTopBooks(res.data.books))
      .catch(() => setTopBooks([]));
  }, []);

  const handleSearch = (book: string) => {
    const trimmed = book.trim();
    setMessage(null);

    if (trimmed === "") {

      setRecommendations(null);
      return;
    }
    axios.get(`https://http://127.0.0.1:5000/recommend?book=${encodeURIComponent(book)}`)
      .then(res => {
        const recs = res.data.recommended;
        if (!recs || recs.length === 0) {
          setMessage("🔍 No match found — returning to Top Books...");
          setRecommendations(null);
          setTimeout(() => setMessage(null), 2000);
        } else {
          setRecommendations(recs);
        }
      })
      .catch(() => {
        setMessage("⚠️ Error fetching recommendations");
        setRecommendations(null);
        setTimeout(() => setMessage(null), 2000);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <SearchBar onSearch={handleSearch} />

      {message && (
        <p className="text-center text-red-500 mt-4">{message}</p>
      )}

      <BookGrid
        books={recommendations ?? topBooks}
        title={recommendations ? "Recommended Books" : "Top 50 Books"}
      />
    </div>
  );
}

export default App;
