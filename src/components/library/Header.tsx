import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="py-4 mb-14 flex justify-between items-center relative">
      <ChevronLeftIcon
        className="w-10 p-2 cursor-pointer"
        onClick={() => navigate(-1)}
      />

      <p className="font-bold text-[1.1rem] absolute left-1/2 -translate-x-1/2">
        My Library
      </p>
    </div>
  );
};
