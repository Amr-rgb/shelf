import { createContext, ReactNode, useContext } from "react";

const BooksContext = createContext({});

export const useBooks = () => {
  return useContext(BooksContext);
};

export const BooksContextProvider = ({ children }: { children: ReactNode }) => {
  return <BooksContext.Provider value={{}}>{children}</BooksContext.Provider>;
};
