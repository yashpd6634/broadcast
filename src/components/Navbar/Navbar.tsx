import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

interface NavbarProps {
  setSearchTerm: (searchTerm: string) => void;
}

type Props = NavbarProps;

const Navbar = ({ setSearchTerm }: Props) => {
  const [localSearch, setLocalSearch] = useState("");

  const debouncedSearhTerm = useDebounce(localSearch, 500);

  useEffect(() => {
    setSearchTerm(localSearch);
  }, [debouncedSearhTerm]);

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">📺</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              News Broadcast
            </h1>
          </div>
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-white/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search news, headlines, content..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
              />
              {localSearch && (
                <button
                  onClick={() => setLocalSearch("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-white/80 transition-colors duration-200"
                >
                  <svg
                    className="h-5 w-5 text-white/50 hover:text-white/80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-sm text-white/70">Live</span>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
