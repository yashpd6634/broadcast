import { useState } from "react";
import Comments from "./Comments";
import {
  handleDelete,
  handleLikes,
  updateNews,
  type News,
} from "../../features/news/newsSlice";
import { useDispatch } from "react-redux";

type Props = {
  key: number;
  news: News;
};

const NewsCard = ({ news }: Props) => {
  const [editingState, setEditingState] = useState(false);
  const [editedContent, setEditedContent] = useState(news.newsContent);
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        <h2 className="text-white text-2xl font-bold leading-tight">
          {news.headline}
        </h2>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1">
        <div
          hidden={editingState}
          className="text-gray-700 text-base leading-relaxed mb-4 whitespace-pre-wrap"
        >
          {news.newsContent}
        </div>
        <textarea
          hidden={!editingState}
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full rounded-lg border-2 border-gray-300 h-32 p-3 text-black bg-gray-50 resize-none focus:border-blue-500 focus:outline-none transition-colors duration-200"
        ></textarea>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => dispatch(handleLikes({ id: news.id }))}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-md text-sm font-medium"
          >
            ❤️ {news.likes}
          </button>
          <button
            onClick={() => dispatch(handleDelete({ id: news.id }))}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-md text-sm font-medium"
          >
            🗑️ Delete
          </button>
          <button
            onClick={() => setEditingState(!editingState)}
            hidden={editingState}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-md text-sm font-medium"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => {
              dispatch(updateNews({ id: news.id, newsContent: editedContent }));
              setEditingState((currentState) => !currentState);
            }}
            hidden={!editingState}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-md text-sm font-medium"
          >
            ✅ Save
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105 shadow-md text-sm font-medium"
          >
            💬 {showComments ? "Hide" : "Show"} Comments
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {!showComments && (
        <div className="px-6 pb-4">
          <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
            <Comments news={news} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsCard;
