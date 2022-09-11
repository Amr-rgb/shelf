import { useState } from "react";
import { useLibrary } from "../../context/LibraryContext";

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

type FormType = {
  pagesValue: string;
  readValue: string;
  setPagesValue: (val: string) => void;
  setReadValue: (val: string) => void;
};

export const AddBook = ({ book }: { book: bookType }) => {
  const [open, setOpen] = useState(false);
  const [pagesValue, setPagesValue] = useState("");
  const [readValue, setReadValue] = useState("");

  const { addToLibrary } = useLibrary();

  const clickHandler = () => {
    const ourBook = {
      id: "" + book.book_id,
      title: book.name!,
      authors: book.authors!,
      pages: Number(pagesValue),
      read: Number(readValue),
      imgUrl: book.cover!,
    };

    addToLibrary(ourBook);
  };

  return (
    <div>
      <button
        className={`mb-8 flex items-center justify-center space-x-4 w-full py-4 mt-8 rounded-xl bg-lightGreen font-medium text-sm ${
          open ? "hidden" : ""
        }`}
        onClick={() => setOpen(true)}
      >
        <span>Add To Library</span>{" "}
        <span className="text-xl bg-green text-white w-6 h-6 rounded-md flex items-center justify-center">
          +
        </span>
      </button>

      <div className={`bg-white p-8 rounded-xl ${!open ? "hidden" : ""}`}>
        <Form
          pagesValue={pagesValue}
          readValue={readValue}
          setPagesValue={setPagesValue}
          setReadValue={setReadValue}
        />

        <button
          className="flex items-center justify-center space-x-4 w-full py-4 mt-8 rounded-xl bg-lightGreen font-medium text-sm"
          onClick={clickHandler}
        >
          <span>Add To Library</span>{" "}
          <span className="text-xl bg-green text-white w-6 h-6 rounded-md flex items-center justify-center">
            +
          </span>
        </button>
      </div>
    </div>
  );
};

const Form = ({
  pagesValue,
  readValue,
  setPagesValue,
  setReadValue,
}: FormType) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <p className="w-16">pages</p>
        <input
          className="ml-4 mr-auto p-3 w-32 flex-1 border border-lightGreen"
          type="text"
          value={pagesValue}
          onChange={(e) => setPagesValue(e.target.value)}
        />
      </div>

      <div className="flex items-center">
        <p className="w-16">read</p>
        <input
          className="ml-4 mr-auto p-3 w-32 flex-1 border border-lightGreen"
          type="text"
          value={readValue}
          onChange={(e) => setReadValue(e.target.value)}
        />
      </div>
      <p className="text-xs opacity-50">all details can be changed later</p>
    </div>
  );
};
