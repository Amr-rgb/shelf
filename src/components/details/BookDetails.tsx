import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AddBook } from "./AddBook";
import { Header } from "./Header";

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
          {loc === "library" ? <UserDetails /> : <AddBook book={book} />}

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

const UserDetails = () => {
  return (
    <div className="bg-white p-8 rounded-xl">
      <div className="space-y-2">
        <UserDetail title="pages" value="234" />
        <UserDetail title="read" value="20" />
      </div>

      <div className="mt-8 flex space-x-2">
        <button className="flex-1 py-4 px-8 rounded-xl bg-lightGreen">
          Save
        </button>
        <button className="flex-1 py-4 px-8 rounded-xl bg-[#f00] text-white">
          Delete
        </button>
      </div>
    </div>
  );
};

const UserDetail = ({ title, value }: { title: string; value: string }) => {
  const [active, setActive] = useState(false);
  const [val, setVal] = useState(value);
  let input = useRef<HTMLInputElement>(null);

  const clickHandler = () => {
    setActive(true);
    input.current?.focus();
  };

  useEffect(() => {
    active && input.current?.focus();
  }, [active]);

  return (
    <div className="flex items-center">
      <p className="w-16">{title}</p>
      <input
        ref={input}
        className="ml-4 mr-auto p-3 w-32"
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        disabled={!active}
      />

      <button
        className="p-2 px-4 bg-lightGreen text-green rounded-lg"
        onClick={clickHandler}
      >
        Edit
      </button>
    </div>
  );
};
