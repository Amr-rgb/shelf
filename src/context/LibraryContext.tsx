import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type bookType = {
  custom?: boolean;
  id: string;
  title: string;
  authors?: string[];
  read: number;
  pages: number;
  imgUrl: string;
};

type LibraryContextType = {
  library: bookType[];
  statistics: { books: number; read: number };
  toast: { show: boolean; success: boolean; message: string } | undefined;
  getBook: (bookId: string) => bookType;
  addToLibrary: (book: bookType) => void;
  deleteFromLibrary: (bookId: string) => void;
  editBook: (bookId: string, pages: number, read: number) => void;
  showMessage: (success: boolean, message: string) => void;
};

const LibraryContext = createContext({} as LibraryContextType);

export const useLibrary = () => {
  return useContext(LibraryContext);
};

export const LibraryContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [library, setLibrary] = useState<bookType[]>([]);

  useEffect(() => {
    const json = window.localStorage.getItem("library");
    json && setLibrary(JSON.parse(json));
  }, []);

  const [statistics, setStatistics] = useState({ books: 0, read: 0 });

  const getReadPages = () =>
    library.reduce((prev: any, curr: any) => {
      return prev + curr.read;
    }, 0);

  useEffect(() => {
    setStatistics({ books: library.length, read: getReadPages() });
  }, [library]);

  const getBook = (bookId: string) => {
    return library.find((b) => b.id === bookId)!;
  };

  const addToLibrary = (book: bookType) => {
    setLibrary((prev: any) => {
      const newLibrary = prev.concat(book);
      window.localStorage.setItem("library", JSON.stringify(newLibrary));
      setTimeout(() => showMessage(true, "Your Book Added Successfully"), 500);
      return newLibrary;
    });
  };

  const deleteFromLibrary = (bookId: string) => {
    setLibrary((prev: any) => {
      const newLibrary = prev.filter((b: bookType) => b.id !== bookId);
      window.localStorage.setItem("library", JSON.stringify(newLibrary));
      setTimeout(
        () => showMessage(true, "Your Book Deleted Successfully"),
        500
      );
      return newLibrary;
    });
  };

  const editBook = (bookId: string, pages: number, read: number) => {
    setLibrary((prev: any) => {
      const newLibrary = prev.map((book: bookType) => {
        if (book.id === bookId) return { ...book, pages, read };
        else return book;
      });
      window.localStorage.setItem("library", JSON.stringify(newLibrary));
      setTimeout(() => showMessage(true, "Your Edits Saved Successfully"), 500);
      return newLibrary;
    });
  };

  const [toast, setToast] = useState<
    { show: boolean; success: boolean; message: string } | undefined
  >();

  const showMessage = (success: boolean, message: string) => {
    setToast({ show: true, success, message });
    setTimeout(() => setToast({ show: false, success, message }), 2500);
  };

  return (
    <LibraryContext.Provider
      value={{
        library,
        statistics,
        toast,
        getBook,
        addToLibrary,
        deleteFromLibrary,
        editBook,
        showMessage,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
