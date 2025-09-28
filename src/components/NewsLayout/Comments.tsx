import { useState } from "react";
import type { News } from "../../features/news/newsSlice";
import { useDispatch } from "react-redux";
import { addComment as addCommentReducer } from "../../features/news/newsSlice";

type Props = {
  news: News;
};

const Comments = ({ news }: Props) => {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();

  const addComment = () => {
    if (!newComment.trim()) return;

    dispatch(addCommentReducer({ id: news.id, comment: newComment }));

    setNewComment("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addComment();
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      {/* Comments List */}
      <div className="space-y-2">
        {news.comments.length === 0 ? (
          <p className="text-gray-500 text-sm italic text-center py-2">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          news.comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <p className="text-gray-800 text-sm leading-relaxed">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Section */}
      <div className="flex flex-col space-y-2">
        <textarea
          className="w-full rounded-lg border-2 border-gray-300 p-3 text-black bg-white resize-none focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={addComment}
          disabled={!newComment.trim()}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md text-sm font-medium"
        >
          💬 Add Comment
        </button>
      </div>
    </div>
  );
};

export default Comments;
