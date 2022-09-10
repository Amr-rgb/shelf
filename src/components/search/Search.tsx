import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Results } from "./Results";

type SearchHeaderType = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "24d34f98acmshb5a060c30549351p12ce41jsn128c2396fe27",
    "X-RapidAPI-Host": "hapi-books.p.rapidapi.com",
  },
};

export const Search = () => {
  const [searchValue, setSearchValue] = useState(
    window.sessionStorage.getItem("searchValue") || ""
  );
  const debouncedValue = useDebounce(searchValue, 500);

  const [results, setResults] = useState([]);

  useEffect(() => {
    results.length &&
      window.sessionStorage.setItem("books", JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    if (debouncedValue && !window.sessionStorage.getItem("searchValue")) {
      axios
        .get(
          `https://hapi-books.p.rapidapi.com/search/${debouncedValue
            .split(" ")
            .join("+")}`,
          options
        )
        .then((res) => setResults(res.data))
        .catch((err) => console.error(err));
    }
  }, [debouncedValue]);

  return (
    <div>
      <SearchHeader searchValue={searchValue} setSearchValue={setSearchValue} />

      <Results res={results} searchValue={searchValue} />
    </div>
  );
};

const SearchHeader = ({ searchValue, setSearchValue }: SearchHeaderType) => {
  return (
    <div>
      <div className="flex space-x-2">
        <div className="p-2 flex justify-end bg-lightGreen w-20 rounded-r-full">
          <div className="bg-white rounded-full w-fit p-2 cursor-pointer">
            <XMarkIcon className="w-6" />
          </div>
        </div>

        <div className="p-2 flex-1 flex items-center bg-lightGreen rounded-l-full">
          <input
            type="text"
            className="px-6 w-[200px] flex-1 border-none outline-none bg-transparent"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <MagnifyingGlassIcon className="w-10 p-2 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
