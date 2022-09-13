import {
  HomeIcon,
  MagnifyingGlassIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  return (
    <div
      className="nav z-50 py-4 pb-6 fixed bottom-0 left-0 right-0"
      style={{
        display: active === "/" || active === "/preferences" ? "none" : "block",
      }}
    >
      <div className="px-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/search")}
          className={`rounded-3xl p-5 duration-500 ${
            active === "/search"
              ? "bg-white pointer-events-none"
              : "cursor-pointer"
          }`}
        >
          <MagnifyingGlassIcon className="p-2 w-11" />
        </button>

        <button
          onClick={() => navigate("/home")}
          className={`rounded-3xl p-5 duration-500 ${
            active === "/home"
              ? "bg-white pointer-events-none"
              : "cursor-pointer"
          }`}
        >
          <HomeIcon className="p-2 w-11" />
        </button>

        <button
          onClick={() => navigate("/library")}
          className={`rounded-3xl p-5 duration-500 ${
            active === "/library"
              ? "bg-white pointer-events-none"
              : "cursor-pointer"
          }`}
        >
          <QueueListIcon className="p-2 w-11" />
        </button>
      </div>
    </div>
  );
};
