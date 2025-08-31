type Props = {
  title: string;
  author: string;
  image: string;
  onGetSummary: () => void;
};

export default function BookCard({ title, author, image, onGetSummary }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition">
      <img
        src={image || "https://via.placeholder.com/150"}
        alt={title}
        className="w-full h-48 object-cover rounded mb-3"
      />
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-lg font-bold text-gray-800 mb-1 flex-grow">{title}</p>
        <p className="text-sm text-gray-600 mb-4">by {author}</p>
        
        <button
          onClick={onGetSummary}
          className="mt-auto w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm font-semibold"
        >
         AI Summary
        </button>
      </div>
    </div>
  );
}
