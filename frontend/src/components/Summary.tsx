type Props = {
  summary: string;
  isLoading: boolean;
  onClose: () => void;
};

export default function Summary({ summary, isLoading, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={onClose} // Close modal on background click
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-900 text-3xl font-light"
          aria-label="Close summary"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">✨ AI Summary</h2>
        {isLoading ? (
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-blue-500"></div>
            <span>Generating summary...</span>
          </div>
        ) : (
          <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
        )}
      </div>
    </div>
  );
}