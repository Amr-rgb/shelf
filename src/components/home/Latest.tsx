import { Link, useNavigate } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";

type bookType = {
  id: string;
  title: string;
  authors?: string[];
  read: number;
  pages: number;
  imgUrl?: string;
};

type BookCardType = {
  book: bookType;
};

export const Latest = () => {
  const { library } = useLibrary();
  const latestBooks = library.slice(0, 2);

  return (
    <div className="mt-14">
      <p className="mb-8 font-bold text-green">Continue Reading</p>
      {latestBooks.length ? (
        <div className="space-y-12">
          {latestBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="mt-20 flex flex-col items-center justify-center">
          You Have No Books Yet
          <Link to="/search" className="mt-2 text-lg text-cyan-600 underline">
            Try Searching For Some
          </Link>
        </div>
      )}
    </div>
  );
};

export const BookCard = ({ book }: BookCardType) => {
  const navigate = useNavigate();

  const percentage: number = Number(
    ((book.read / book.pages) * 100).toFixed(0)
  );

  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => navigate(`/library/${book.id}`)}
    >
      {book.imgUrl ? (
        <div
          className="bg-cover bg-center shadow-[5px_5px_20px_rgba(40,53,60,.2)] w-14 h-20"
          style={{
            backgroundImage: `url(${book.imgUrl})`,
          }}
        ></div>
      ) : (
        <div className="shadow-[5px_5px_20px_rgba(40,53,60,.2)] w-14 h-20 bg-lightGreen"></div>
      )}

      <div className="ml-6 mr-auto space-y-2 flex-1 max-w-[12rem]">
        <p className="capitalize font-caudex font-bold text-xl leading-6 w-28">
          {book.title}
        </p>
        <p className="text-sm opacity-30">
          {book.authors?.map((author, idx, arr) => (
            <span key={idx} className="capitalize">
              {author}
              {idx < arr.length - 1 && ", "}
            </span>
          ))}
        </p>
      </div>

      <div className="flex flex-col space-y-4 text-center">
        <p className="font-medium text-lg text-green opacity-70">
          {percentage}%
        </p>
        <div
          className="progress-circle w-8 h-8 rounded-full"
          style={{
            background: `conic-gradient(#28353c ${percentage}%, #fff ${percentage}% ${
              100 - percentage
            }%)`,
          }}
        ></div>
      </div>
    </div>
  );
};
