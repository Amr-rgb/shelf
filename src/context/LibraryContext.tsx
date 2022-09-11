import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type bookType = {
  id: string;
  title: string;
  authors: string[];
  read: number;
  pages: number;
  imgUrl: string;
};

type LibraryContextType = {
  library: bookType[];
  getBook: (bookId: string) => bookType;
  addToLibrary: (book: bookType) => void;
  deleteFromLibrary: (bookId: string) => void;
  editBook: (bookId: string, pages: number, read: number) => void;
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

  const getBook = (bookId: string) => {
    return library.find((b) => b.id === bookId)!;
  };

  const addToLibrary = (book: bookType) => {
    setLibrary((prev: any) => {
      const newLibrary = prev.concat(book);
      window.localStorage.setItem("library", JSON.stringify(newLibrary));
      return newLibrary;
    });
  };

  const deleteFromLibrary = (bookId: string) => {
    setLibrary((prev: any) => {
      const newLibrary = prev.filter((b: bookType) => b.id !== bookId);
      window.localStorage.setItem("library", JSON.stringify(newLibrary));
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
      return newLibrary;
    });
  };

  return (
    <LibraryContext.Provider
      value={{ library, getBook, addToLibrary, deleteFromLibrary, editBook }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
