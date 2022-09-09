import { Header } from "./Header";
import { BookCard } from "./../home/Latest";
import { Link } from "react-router-dom";

type bookType = {
  id: string;
  title: string;
  authors: string[];
  read: number;
  pages: number;
  imgUrl: string;
};

export const Library = () => {
  const books: bookType[] = [
    {
      id: "1",
      title: "The Goldfinch",
      authors: ["Donna Tartt"],
      read: 124,
      pages: 200,
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_hNKNOpY_W-Xlr_O6cCppzUX-fxkDKK88GEem1-kFdsAMNRTX5rjd5AkLAkh_J_GBBIc&usqp=CAU",
    },
    {
      id: "2",
      title: "The Goldfinch",
      authors: ["Donna Tartt"],
      read: 113,
      pages: 300,
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_hNKNOpY_W-Xlr_O6cCppzUX-fxkDKK88GEem1-kFdsAMNRTX5rjd5AkLAkh_J_GBBIc&usqp=CAU",
    },
  ];

  return (
    <div>
      <Header />

      {books.length ? (
        <div className="space-y-6">
          {books.map((book) => (
            <div className="bg-white p-4 rounded-lg space-y-2">
              <BookCard key={book.id} book={book} />
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
