import { useLibrary } from "../../context/LibraryContext";
import { usePreferences } from "../../context/PreferencesContext";

export const Main = () => {
  return (
    <div className="space-y-12">
      <Header />
      <Statistics />
    </div>
  );
};

const Header = () => {
  const { name, gender } = usePreferences();

  return (
    <div className="flex items-center space-x-4">
      <div
        className={`bg-[#e1e1e1] bg-[url(/${
          gender || "male"
        }.png)] bg-contain bg-no-repeat bg-top w-20 h-20 rounded-full`}
      ></div>
      <div>
        <p className="font-medium text-xs opacity-30">Welcome Back,</p>
        <p className="font-caudex font-bold text-3xl capitalize">
          {name || "user"}!
        </p>
      </div>
    </div>
  );
};

const Statistics = () => {
  const { statistics } = useLibrary();

  return (
    <div>
      <p className="mb-6 text-sm">
        here's a summary of your achievements,{" "}
        <span className="block">keep reading!</span>
      </p>
      <div className="py-8 bg-white rounded-2xl flex items-center justify-center space-x-20">
        <div className="text-center">
          <p className="font-caudex font-bold text-3xl text-green">
            {statistics.books}
          </p>
          <p className="font-medium text-xs opacity-30">Books</p>
        </div>
        <div className="text-center">
          <p className="font-caudex font-bold text-3xl text-green">
            {statistics.read}
          </p>
          <p className="font-medium text-xs opacity-30">Pages</p>
        </div>
      </div>
    </div>
  );
};
