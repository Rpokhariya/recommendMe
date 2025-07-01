import BookCard from './BookCard';

type Book = {
  title: string;
  author: string;
  image: string;
};

type Props = {
  books: Book[];
  title: string;
};

export default function BookGrid({ books, title }: Props) {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">{title}</h2>
      {books.length === 0 ? (
        <p className="text-center text-red-500">No books found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {books.map((book, idx) => (
            <BookCard key={idx} {...book} />
          ))}
        </div>
      )}
    </section>
  );
}
