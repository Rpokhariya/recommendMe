import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BookGrid from './components/BookGrid';
import Summary from './components/Summary';

type Book = {
  title: string;
  author: string;
  image: string;
};

const API_BASE_URL = 'api';

function App() {
  const [topBooks, setTopBooks] = useState<Book[]>([]);
  const [recommendations, setRecommendations] = useState<Book[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [summary, setSummary] = useState('');
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/top-books`)
      .then(res => {
        setTopBooks(res.data.books || []);
      })
      .catch(err => {
        console.error("Failed to fetch top books:", err);
        setMessage("Could not load top books. Please try again later.");
        setTopBooks([]);
      });
  }, []);

  const handleSearch = (book: string) => {
    const trimmed = book.trim();
    setMessage(null);

    if (trimmed === "") {
      setRecommendations(null);
      return;
    }
    axios.get(`${API_BASE_URL}/recommend?book=${encodeURIComponent(book)}`)
      .then(res => {
        const recs = res.data.recommended;
        if (!recs || recs.length === 0) {
          setMessage("🔍 No match found — returning to Top Books...");
          setRecommendations(null);
          setTimeout(() => setMessage(null), 3000);
        } else {
          setRecommendations(recs);
        }
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
        setMessage("⚠️ Could not find book. Returning to Top Books.");
        setRecommendations(null);
        setTimeout(() => setMessage(null), 3000);
      });
  };

  const handleGetSummary = (book: Book) => {
    setIsSummaryLoading(true);
    setSummary('');
    setIsModalOpen(true);

    axios.post(`${API_BASE_URL}/summary`, {
      title: book.title,
      author: book.author
    })
    .then(response => {
      setSummary(response.data.summary);
    })
    .catch(() => {
      setSummary("Sorry, an error occurred while generating the summary.");
    })
    .finally(() => {
      setIsSummaryLoading(false);
    });
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <SearchBar onSearch={handleSearch} />

      {message && (
        <p className="text-center text-red-500 mt-4">{message}</p>
      )}

      <BookGrid
        books={recommendations ?? topBooks}
        title={recommendations ? "Recommended For You" : "Top 50 Books"}
        onGetSummary={handleGetSummary}
      />

      {isModalOpen && (
        <Summary
          summary={summary}
          isLoading={isSummaryLoading}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
