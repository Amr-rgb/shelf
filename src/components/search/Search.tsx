import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Results } from "./Results";

type SearchHeaderType = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div>
      <SearchHeader searchValue={searchValue} setSearchValue={setSearchValue} />

      <Results />
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
