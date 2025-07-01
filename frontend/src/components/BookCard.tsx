type Props = {
  title: string;
  author: string;
  image: string;
};

export default function BookCard({ title, author, image }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition">
      <img
        src={image || "https://via.placeholder.com/150"}
        alt={title}
        className="w-full h-48 object-cover rounded mb-3"
      />
      <p className="text-lg font-medium text-gray-800">{title}</p>
      <p className="text-sm text-gray-500">by {author}</p>
    </div>
  );
}
