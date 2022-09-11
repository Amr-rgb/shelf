import { Header } from "./Header";
import { BookCard } from "./../home/Latest";
import { Link } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";

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

  return (
    <div>
      <Header />

      {books.length ? (
        <div className="space-y-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white p-4 rounded-lg space-y-2">
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
    </div>
  );
};
