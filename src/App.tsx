import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/home/Home";
import { Search } from "./components/search/Search";
import { Library } from "./components/library/Library";
import { BookDetails } from "./components/details/BookDetails";

function App() {
  return (
    <div className="App px-4 py-8 pb-44">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search">
          <Route index element={<Search />} />
          <Route path=":bookId" element={<BookDetails />} />
        </Route>
        <Route path="/library">
          <Route index element={<Library />} />
          <Route path=":bookId" element={<BookDetails />} />
        </Route>
      </Routes>

      <Navbar />
    </div>
  );
}

export default App;
