import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AddBook } from "./AddBook";
import { Header } from "./Header";

export const BookDetails = () => {
  const { bookId } = useParams();
  const location = useLocation();
  const [loc] = useState(location.pathname.split("/")[1]);

  const details = {
    book_id: 896220,
    name: "Close Ups: From The Golden Age Of The Silent Cinema",
    cover:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/nophoto/book/111x148._SX50_.png",
    url: "https://www.goodreads.com/book/show/896220.Close_Ups?from_search=true&from_srp=true&qid=NIsMMSmPhN&rank=16",
    authors: ["John Richard Finch"],
    rating: 0,
    created_editions: 1,
  };

  return (
    <div>
      <Header />

      <div className="space-y-8">
        {loc === "library" ? <UserDetails /> : <AddBook />}

        <div className="space-y-6 bg-white p-4 py-8 rounded-xl">
          <p className="uppercase font-caudex font-bold text-xl text-center">
            book details
          </p>
          <span className="block w-full h-[1px] bg-lightGreen"></span>
          {Object.entries(details).map(([title, value]) => (
            <BookDetail key={title} title={title} value={value} />
          ))}
        </div>
      </div>
    </div>
  );
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
