import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type bookType = {
  book_id?: number;
  name?: string;
  cover?: string;
  url?: string;
  authors?: string[];
  rating?: number;
  created_editions?: number;
  year?: number;
};

type BookCardType = {
  book: bookType;
  searchValue: string;
};

type ResultsType = {
  res: bookType[];
  searchValue: string;
  isLoading: boolean;
};

export const Results = ({ res, searchValue, isLoading }: ResultsType) => {
  const [results, setResults] = useState<bookType[]>(
    JSON.parse(window.sessionStorage.getItem("books")!)
  );

  useEffect(() => {
    if ((results && results.length === 0) || !results) {
      setResults(res);
    }
  }, [res]);

  return (
    <div className="mt-14 relative">
      <ResultsHeader number={results?.length || 0} />

      {isLoading && (
        <div className="absolute left-1/2 top-[10rem] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <img
            className="animate-spin w-10 h-10"
            src="/loading.svg"
            alt="loading"
          />
        </div>
      )}

      {!isLoading && results && (
        <div className="mt-10 space-y-6">
          {results.map((res) => (
            <ResultCard
              key={res.book_id}
              book={res}
              searchValue={searchValue}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ResultsHeader = ({ number }: { number: number }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <h1 className="font-bold text-lg">Results: {number}</h1>
      <p className="text-sm">
        Or{" "}
        <span
          className="ml-1 text-base underline text-green cursor-pointer"
          onClick={() => navigate("custom")}
        >
          Add Custom Book
        </span>
      </p>
    </div>
  );
};

const ResultCard = ({ book, searchValue }: BookCardType) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const clickHandler = () => {
    window.sessionStorage.setItem("searchValue", searchValue);
    navigate(`${book.book_id}`);
  };

  return (
    <>
      <div className="flex items-center bg-white p-3 rounded-xl relative">
        <div
          className="bg-cover bg-center shadow-[5px_5px_20px_rgba(40,53,60,.2)] w-14 h-20 cursor-pointer"
          style={{
            backgroundImage: `url(${book.cover})`,
          }}
          onClick={clickHandler}
        ></div>

        <div className="ml-6 mr-auto space-y-2 flex-1 max-w-[12rem]">
          <p className="capitalize font-caudex font-bold text-xl leading-6 w-28">
            {book.name}
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

        <div className="self-start -mt-2">
          <div
            className="flex items-center justify-center space-x-1 w-11 h-11 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="block w-1 h-1 rounded-full bg-lightGreen"></span>
            <span className="block w-1 h-1 rounded-full bg-lightGreen"></span>
            <span className="block w-1 h-1 rounded-full bg-lightGreen"></span>
          </div>

          <div
            className="z-50 absolute top-11 right-3 text-sm bg-white shadow-sm rounded-lg px-2 py-2 space-y-2"
            style={{ display: open ? "block" : "none" }}
          >
            <button onClick={clickHandler} className="block cursor-pointer p-2">
              Add To Library
            </button>
            <button onClick={clickHandler} className="cursor-pointer p-2">
              See Details
            </button>
          </div>
        </div>
      </div>

      <div
        className="z-40 fixed inset-0 bg-white opacity-0"
        style={{ display: open ? "block" : "none" }}
        onClick={() => setOpen(false)}
      ></div>
    </>
  );
};
