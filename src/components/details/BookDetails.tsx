import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";
import { AddBook, isNumeric } from "./AddBook";
import { Header } from "./Header";
import { motion } from "framer-motion";

type libraryBookType = {
  custom?: boolean;
  id: string;
  title: string;
  authors?: string[];
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

export const BookDetails = () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
      "X-RapidAPI-Host": "hapi-books.p.rapidapi.com",
    },
  };
  const { bookId } = useParams();
  const [book, setBook] = useState<bookType>();

  const location = useLocation();
  const [loc] = useState(location.pathname.split("/")[1]);

  const { getBook } = useLibrary();
  const [libBook] = useState(getBook("" + bookId));

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loc === "library" && libBook.custom) {
      const timeOut = setTimeout(() => {
        setIsLoading(false);
        setBook({
          book_id: Number(libBook.id),
          name: libBook.title,
        });
      }, 500);

      return () => clearTimeout(timeOut);
    } else {
      axios
        .get(`https://hapi-books.p.rapidapi.com/book/${bookId}`, options)
        .then((res) => {
          setIsLoading(false);
          setBook(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
          console.error(err);
        });
    }
  }, []);

  if (book) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
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
      </motion.div>
    );
  } else {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        <Header title="Details" />

        {isLoading ? (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <img
              className="animate-spin w-10 h-10"
              src="/loading.svg"
              alt="loading"
            />
          </div>
        ) : (
          <div className="text-center py-32">
            <p>Unable to load details</p>
          </div>
        )}
      </motion.div>
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

  const saveBtn = useRef(null);
  const deleteBtn = useRef(null);

  const { getBook, deleteFromLibrary, editBook, showMessage } = useLibrary();
  const [book, setBook] = useState<libraryBookType>(getBook("" + bookId));

  useEffect(() => {
    setBook(getBook("" + bookId));
  });

  const [values, setValues] = useState<{ pages: number; read: number }>({
    pages: 0,
    read: 0,
  });

  const getValues = (pages: number, read: number) => {
    setValues({ pages, read });
  };

  return (
    <div className="bg-white p-8 rounded-xl">
      {book ? (
        <div className="space-y-2">
          <LibraryBookDetails
            val1={book.pages}
            val2={book.read}
            getValues={getValues}
          />
        </div>
      ) : (
        <div className="py-8 flex items-center justify-center">
          <img
            className="animate-spin w-10 h-10"
            src="/loading.svg"
            alt="loading"
          />
        </div>
      )}

      <div className="mt-8 flex space-x-2">
        <button
          ref={saveBtn}
          className="flex-1 py-4 px-8 rounded-xl bg-lightGreen disabled:opacity-60"
          disabled={!book}
          onClick={(e) => {
            if (
              values.pages &&
              isNumeric(values.pages) &&
              isNumeric(values.read) &&
              Number(values.read) <= Number(values.pages)
            ) {
              editBook("" + bookId, values.pages, values.read);
              const save = saveBtn.current! as HTMLButtonElement;
              const del = deleteBtn.current! as HTMLButtonElement;
              save.disabled = true;
              del.disabled = true;
              setTimeout(() => navigate(-1), 500);
            } else {
              showMessage(false, "Something Wrong In Your Input");
            }
          }}
        >
          Save
        </button>
        <button
          ref={deleteBtn}
          className="flex-1 py-4 px-8 rounded-xl bg-[#f00] text-white disabled:opacity-60"
          disabled={!book}
          onClick={() => {
            deleteFromLibrary("" + bookId);
            setTimeout(() => navigate(-1), 500);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

type LibraryBookDetailsType = {
  val1: number;
  val2: number;
  getValues: (pages: number, read: number) => void;
};

const LibraryBookDetails = ({
  val1,
  val2,
  getValues,
}: LibraryBookDetailsType) => {
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

  useEffect(() => {
    getValues(Number(value1), Number(value2));
  }, [value1, value2]);

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
