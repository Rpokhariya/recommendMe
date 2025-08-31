import BookCard from './BookCard';

type Book = {
  title: string;
  author: string;
  image: string;
};

type Props = {
  books: Book[];
  title: string;
  onGetSummary: (book: Book) => void;
};

export default function BookGrid({ books, title, onGetSummary }: Props) {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">{title}</h2>
      {books.length === 0 ? (
        <p className="text-center text-red-500">No books found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {books.map((book) => (
            <BookCard key={book.title + book.author}
              title={book.title}
              author={book.author} 
              image={book.image}
              onGetSummary={() => onGetSummary(book)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
