import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/home/Home";
import { Search } from "./components/search/Search";
import { Library } from "./components/library/Library";

function App() {
  return (
    <div className="App px-4 py-8 pb-44">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/library" element={<Library />} />
      </Routes>

      <Navbar />
    </div>
  );
}

export default App;
