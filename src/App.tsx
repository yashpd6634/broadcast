import { useState } from "react";
import "./App.css";
import Broadcaster from "./components/Broadcaster/Broadcaster";
import Navbar from "./components/Navbar/Navbar";
import NewsLayout from "./components/NewsLayout/NewsLayout";
import AutoPage from "./components/AutoPage";
import ToastPage from "./components/Toast/ToastPage";
import ToastProvider from "./context/ToastProvider";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen">
      <Navbar setSearchTerm={setSearchTerm} />
      <main>
        {searchTerm.length === 0 ? <Broadcaster /> : null}
        <NewsLayout searchTerm={searchTerm} />
        <AutoPage />
        <ToastProvider>
          <ToastPage />
        </ToastProvider>
      </main>
    </div>
  );
}

export default App;
