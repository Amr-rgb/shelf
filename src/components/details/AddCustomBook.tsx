import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";
import { Header } from "./Header";
import { motion } from "framer-motion";
import { isNumeric } from "./AddBook";

type FormType = {
  title: string;
  pagesValue: string;
  readValue: string;
  setTitle: (val: string) => void;
  setPagesValue: (val: string) => void;
  setReadValue: (val: string) => void;
};

export const AddCustomBook = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [pagesValue, setPagesValue] = useState("");
  const [readValue, setReadValue] = useState("");

  const { addToLibrary, showMessage } = useLibrary();

  const clickHandler = () => {
    if (
      title &&
      isNumeric(pagesValue) &&
      isNumeric(readValue) &&
      Number(readValue) <= Number(pagesValue)
    ) {
      const ourBook = {
        custom: true,
        id: "" + Date.now(),
        title: title,
        pages: Number(pagesValue),
        read: Number(readValue),
        imgUrl: "",
      };

      addToLibrary(ourBook);
      setTimeout(() => {
        showMessage(true, "Your Book Added Successfully");
        navigate("/library");
      }, 500);
    } else {
      showMessage(false, "Something Wrong In Your Input");
    }
  };

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <Header title="Add Custom Book" />

      <div className={`bg-white p-8 rounded-xl ${!open ? "hidden" : ""}`}>
        <Form
          title={title}
          pagesValue={pagesValue}
          readValue={readValue}
          setTitle={setTitle}
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
    </motion.div>
  );
};

const Form = ({
  title,
  pagesValue,
  readValue,
  setTitle,
  setPagesValue,
  setReadValue,
}: FormType) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <p className="w-16">title</p>
        <input
          className="ml-4 mr-auto p-3 w-32 flex-1 border border-lightGreen"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

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
