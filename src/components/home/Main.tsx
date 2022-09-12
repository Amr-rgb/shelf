import { useLibrary } from "../../context/LibraryContext";

export const Main = () => {
  return (
    <div className="space-y-12">
      <Header />
      <Statistics />
    </div>
  );
};

const Header = () => {
  return (
    <div className="flex items-center space-x-4">
      <img
        className="w-16 rounded-full"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        alt="avatar"
      />
      <div>
        <p className="font-medium text-xs opacity-30">Welcome Back,</p>
        <p className="font-caudex font-bold text-3xl">{`John Sortino`}!</p>
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
