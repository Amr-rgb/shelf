import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/home/Home";
import { Search } from "./components/search/Search";
import { Library } from "./components/library/Library";
import { BookDetails } from "./components/details/BookDetails";
import { useEffect } from "react";
import { AddCustomBook } from "./components/details/AddCustomBook";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (
      !location.pathname.startsWith("/search") &&
      window.sessionStorage.getItem("books")
    ) {
      window.sessionStorage.removeItem("searchValue");
      window.sessionStorage.removeItem("books");
    }
  }, [location]);

  return (
    <div className="App px-4 py-8 pb-44">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search">
          <Route index element={<Search />} />
          <Route path=":bookId" element={<BookDetails />} />
          <Route path="custom" element={<AddCustomBook />} />
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
