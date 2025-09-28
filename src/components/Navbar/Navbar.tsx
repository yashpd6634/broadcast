import { useState } from "react";

type Props = {};

const Navbar = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

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
          <div>
            <input
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
