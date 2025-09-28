import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNews } from "../../features/news/newsSlice";

const Broadcaster = () => {
  const [headline, setHeadline] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const dispatch = useDispatch();

  const handleBroadcast = () => {
    if (!headline.trim() || !newsContent.trim()) {
      return;
    }

    const newNews = {
      id: Date.now(),
      headline: headline,
      newsContent: newsContent,
      likes: 0,
      comments: [],
    };

    dispatch(addNews(newNews));
    setHeadline("");
    setNewsContent("");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-4xl border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold  mb-2 bg-clip-text">
            📺 News Broadcaster
          </h1>
          <p className="text-white/80 text-lg">
            Share your story with the world
          </p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <input
              className="w-full rounded-2xl border-2 border-white/30 h-14 px-6 text-gray-800 bg-white/90 backdrop-blur-sm placeholder-gray-500 focus:border-blue-400 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              placeholder="✨ Enter your headline..."
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
              {headline.length}/50
            </div>
          </div>

          <div className="relative">
            <textarea
              className="w-full rounded-2xl border-2 border-white/30 h-48 p-6 pr-32 pb-20 text-gray-800 bg-white/90 backdrop-blur-sm placeholder-gray-500 resize-none focus:border-blue-400 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              placeholder="📝 Write your news content here..."
              value={newsContent}
              onChange={(e) => setNewsContent(e.target.value)}
            ></textarea>
            <div className="absolute right-4 top-4 text-sm text-gray-400">
              {newsContent.length}/500
            </div>
            <button
              disabled={
                headline.trim().length <= 3 || newsContent.trim().length <= 10
              }
              onClick={handleBroadcast}
              className="absolute bottom-4 right-4 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 shadow-md"
            >
              🚀 Broadcast
            </button>
          </div>
        </div>

        {/* Validation indicators */}
        <div className="mt-4 flex space-x-4 text-sm">
          <div
            className={`flex items-center space-x-1 ${
              headline.trim().length > 3 ? "text-green-400" : "text-red-400"
            }`}
          >
            <span>{headline.trim().length > 3 ? "✅" : "❌"}</span>
            <span>Headline (min 4 chars)</span>
          </div>
          <div
            className={`flex items-center space-x-1 ${
              newsContent.trim().length > 10 ? "text-green-400" : "text-red-400"
            }`}
          >
            <span>{newsContent.trim().length > 10 ? "✅" : "❌"}</span>
            <span>Content (min 11 chars)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Broadcaster;
