import { useState } from 'react';

type Props = {
  onSearch: (book: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="recommendMe (Enter a book you like!)"
        className="w-1/2 p-2 border rounded-l-md focus:outline-none"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded-r-md">
        Search
      </button>
    </form>
  );
}
