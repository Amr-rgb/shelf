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
  addToLibrary: (book: bookType) => void;
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

  const addToLibrary = (book: bookType) => {
    setLibrary((prev: any) => {
      const newLibrary = prev.concat(book);
      window.localStorage.setItem("library", JSON.stringify(newLibrary));
      return newLibrary;
    });
  };

  return (
    <LibraryContext.Provider value={{ library, addToLibrary }}>
      {children}
    </LibraryContext.Provider>
  );
};
