import { useState } from "react";
import "./App.css";
import Broadcaster from "./components/Broadcaster/Broadcaster";
import Navbar from "./components/Navbar/Navbar";
import NewsLayout from "./components/NewsLayout/NewsLayout";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main>
        {searchTerm.length === 0 ? <Broadcaster /> : null}
        <NewsLayout searchTerm={searchTerm} />
      </main>
    </div>
  );
}

export default App;
