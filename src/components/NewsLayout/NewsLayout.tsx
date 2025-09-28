import { useSelector } from "react-redux";
import NewsCard from "./NewsCard";
import type { RootState } from "../../store/store";

type Props = {
  searchTerm: string;
};

const NewsLayout = ({ searchTerm }: Props) => {
  const news = useSelector(
    (state: RootState) => state.newsReducer.value
  ).filter(
    (item) =>
      item.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.newsContent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-600">
            📰 Latest News
          </h2>
          <p className="text-gray-600 text-lg">
            {news.length === 0
              ? "No news yet. Be the first to broadcast!"
              : `Showing ${news.length} news ${
                  news.length === 1 ? "article" : "articles"
                }`}
          </p>
        </div>

        {/* News Grid */}
        {news.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📺</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              No News Yet
            </h3>
            <p className="text-gray-500">
              Start broadcasting to see your news here!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {news.map((content) => (
              <NewsCard key={content.id} news={content} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsLayout;
