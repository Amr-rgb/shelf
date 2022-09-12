import { Header } from "./Header";
import { BookCard } from "./../home/Latest";
import { Link, useNavigate } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";
import { motion } from "framer-motion";

type bookType = {
  id: string;
  title: string;
  authors: string[];
  read: number;
  pages: number;
  imgUrl: string;
};

export const Library = () => {
  const { library: books } = useLibrary();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <Header />

      {books.length ? (
        <div className="space-y-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white p-4 rounded-lg space-y-2 cursor-pointer"
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-32 flex flex-col items-center justify-center">
          <p>no books yet</p>
          <Link to="/search" className="mt-2 text-lg text-cyan-600 underline">
            try searching for some
          </Link>
        </div>
      )}
    </motion.div>
  );
};
