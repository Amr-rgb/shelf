import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";
import { AddBook } from "./AddBook";
import { Header } from "./Header";

type libraryBookType = {
  id: string;
  title: string;
  authors: string[];
  read: number;
  pages: number;
  imgUrl: string;
};

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

const options = {
  method: "GET",
  url: "https://hapi-books.p.rapidapi.com/book/56597885",
  headers: {
    "X-RapidAPI-Key": "24d34f98acmshb5a060c30549351p12ce41jsn128c2396fe27",
    "X-RapidAPI-Host": "hapi-books.p.rapidapi.com",
  },
};

export const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<bookType>();

  const location = useLocation();
  const [loc] = useState(location.pathname.split("/")[1]);

  useEffect(() => {
    axios
      .get(`https://hapi-books.p.rapidapi.com/book/${bookId}`, options)
      .then((res) => setBook(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (book) {
    return (
      <div>
        <Header title={book.name!} />

        <div className="space-y-8">
          {loc === "library" ? (
            <UserDetails bookId={book.book_id!} />
          ) : (
            <AddBook book={book} />
          )}

          <div className="space-y-6 bg-white p-4 py-8 rounded-xl">
            <p className="uppercase font-caudex font-bold text-xl text-center">
              book details
            </p>
            <span className="block w-full h-[1px] bg-lightGreen"></span>
            {Object.entries(book).map(([title, value]) => (
              <BookDetail key={title} title={title} value={value} />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Header title="Details" />

        <p>no data</p>
      </div>
    );
  }
};

const BookDetail = ({ title, value }: { title: any; value: any }) => {
  return (
    <div className="space-y-2">
      <p className="font-semibold">{title} :</p>
      {title === "cover" ? (
        <div
          className="bg-cover bg-center shadow-[5px_5px_20px_rgba(40,53,60,.2)] w-14 h-20"
          style={{
            backgroundImage: `url(${value})`,
          }}
        ></div>
      ) : title === "url" ? (
        <a
          className="text-sm leading-relaxed underline inline-block truncate w-full"
          href={value}
          target="_blank"
        >
          {value}
        </a>
      ) : (
        <p className="text-sm leading-relaxed">{value}</p>
      )}
    </div>
  );
};

const UserDetails = ({ bookId }: { bookId: number }) => {
  const navigate = useNavigate();

  const { getBook, deleteFromLibrary } = useLibrary();
  const [book, setBook] = useState<libraryBookType>(getBook("" + bookId));

  useEffect(() => {
    setBook(getBook("" + bookId));
  });

  return (
    <div className="bg-white p-8 rounded-xl">
      {book && (
        <div className="space-y-2">
          <LibraryBookDetails val1={book.pages} val2={book.read} />
        </div>
      )}

      <div className="mt-8 flex space-x-2">
        <button className="flex-1 py-4 px-8 rounded-xl bg-lightGreen">
          Save
        </button>
        <button
          className="flex-1 py-4 px-8 rounded-xl bg-[#f00] text-white"
          onClick={() => {
            deleteFromLibrary("" + bookId);
            navigate(-1);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const LibraryBookDetails = ({ val1, val2 }: { val1: number; val2: number }) => {
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  let input1 = useRef<HTMLInputElement>(null);
  let input2 = useRef<HTMLInputElement>(null);

  const [value1, setValue1] = useState("" + val1);
  const [value2, setValue2] = useState("" + val2);

  const clickHandler1 = () => {
    setActive1(true);
    input1.current?.focus();
  };
  const clickHandler2 = () => {
    setActive2(true);
    input2.current?.focus();
  };

  useEffect(() => {
    active1 && input1.current?.focus();
  }, [active1]);

  useEffect(() => {
    active2 && input2.current?.focus();
  }, [active2]);

  return (
    <>
      <div className="flex items-center">
        <p className="w-16">pages</p>
        <input
          ref={input1}
          className="ml-4 mr-auto p-3 w-32"
          type="text"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          disabled={!active1}
        />

        <button
          className="p-2 px-4 bg-lightGreen text-green rounded-lg"
          onClick={clickHandler1}
        >
          Edit
        </button>
      </div>

      <div className="flex items-center">
        <p className="w-16">read</p>
        <input
          ref={input2}
          className="ml-4 mr-auto p-3 w-32"
          type="text"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          disabled={!active2}
        />

        <button
          className="p-2 px-4 bg-lightGreen text-green rounded-lg"
          onClick={clickHandler2}
        >
          Edit
        </button>
      </div>
    </>
  );
};
