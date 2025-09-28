import "./App.css";
import Broadcaster from "./components/Broadcaster/Broadcaster";
import Navbar from "./components/Navbar/Navbar";
import NewsLayout from "./components/NewsLayout/NewsLayout";

function App() {

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Broadcaster />
        <NewsLayout />
      </main>
    </div>
  );
}

export default App;
