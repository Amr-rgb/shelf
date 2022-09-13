import { createContext, ReactNode, useContext, useState } from "react";

type PreferencesContextProviderType = {
  children: ReactNode;
};

type PreferencesContextType = {
  name: string;
  gender: string;
  setUserName: (name: string) => void;
  setUserGender: (gender: string) => void;
};

const PreferencesContext = createContext({} as PreferencesContextType);

export const usePreferences = () => {
  return useContext(PreferencesContext);
};

export const PreferencesContextProvider = ({
  children,
}: PreferencesContextProviderType) => {
  const [name, setName] = useState(window.localStorage.getItem("userName")!);
  const [gender, setGender] = useState(
    window.localStorage.getItem("userGender")!
  );

  const setUserName = (name: string) => {
    setName(name);
    window.localStorage.setItem("userName", name);
  };

  const setUserGender = (gender: string) => {
    setGender(gender);
    window.localStorage.setItem("userGender", gender);
  };

  return (
    <PreferencesContext.Provider
      value={{ name, gender, setUserName, setUserGender }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};
