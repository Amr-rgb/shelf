import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/home/Home";
import { Search } from "./components/search/Search";
import { Library } from "./components/library/Library";
import { BookDetails } from "./components/details/BookDetails";
import { useEffect } from "react";
import { AddCustomBook } from "./components/details/AddCustomBook";
import { Toast } from "./components/Toast";
import { useLibrary } from "./context/LibraryContext";
import { AnimatePresence } from "framer-motion";
import { Start } from "./components/start/Start";
import { Preferences } from "./components/start/Preferences";

function App() {
  const { toast } = useLibrary();

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
    <div
      className="App px-4 py-8"
      style={{ paddingBottom: location.pathname === "/" ? "0" : "11rem" }}
    >
      <Toast
        show={toast?.show!}
        success={toast?.success!}
        message={toast?.message!}
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Start />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/home" element={<Home />} />
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
      </AnimatePresence>

      <Navbar />
    </div>
  );
}

export default App;
