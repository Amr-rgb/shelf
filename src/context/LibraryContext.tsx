import { createContext, ReactNode, useContext } from "react";

type LibraryContextType = {};

const LibraryContext = createContext({} as LibraryContextType);

export const useLibrary = () => {
  return useContext(LibraryContext);
};

export const LibraryContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <LibraryContext.Provider value={{}}>{children}</LibraryContext.Provider>
  );
};
