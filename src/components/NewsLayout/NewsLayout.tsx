import { useSelector } from "react-redux";
import NewsCard from "./NewsCard";
import type { RootState } from "../../store/store";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import ProgressBar from "./ProgressBar";
import CityList from "./CityList";

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

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);
  const intervalRef = useRef<number | null>(null);

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    startTimeRef.current = Date.now() - accumulatedTimeRef.current;
    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startTimeRef.current);
    }, 10);
  };

  const pause = () => {
    if (!isRunning) return;
    setIsRunning(false);
    accumulatedTimeRef.current = time;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    pause();
    setTime(0);
    accumulatedTimeRef.current = 0;
    startTimeRef.current = 0;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const tenths = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${tenths.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <CityList
        cityData={[
          { cityId: "NYC001", name: "New York", country: "USA" },
          { cityId: "LON002", name: "London", country: "UK" },
          { cityId: "TOK003", name: "Tokyo", country: "Japan" },
          { cityId: "PAR004", name: "Paris", country: "France" },
          { cityId: "SYD005", name: "Sydney", country: "Australia" },
          { cityId: "PAR006", name: "Pargue", country: "Australia" },
        ]}
      />
      <div>
        <h1 className="text-black text-3xl">Stop Watch</h1>
        <div className="text-black text-2xl my-3">{formatTime(time)}</div>
      </div>
      <div className="mb-5">
        <div className="flex justify-center gap-4">
          <button
            onClick={isRunning ? pause : start}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              isRunning
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isRunning ? (
              <>
                <Pause size={20} /> Pause
              </>
            ) : (
              <>
                <Play size={20} /> Play
              </>
            )}
          </button>

          <button
            onClick={reset}
            disabled={time === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-gray-500 hover:bg-gray-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <RotateCcw size={20} /> Reset
          </button>
        </div>
      </div>
      <ProgressBar />
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
