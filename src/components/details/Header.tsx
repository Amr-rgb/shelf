import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const Header = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  return (
    <div className="py-4 mb-14 flex justify-between items-center relative">
      <ChevronLeftIcon
        className="w-10 p-2 cursor-pointer"
        onClick={() => navigate(-1)}
      />

      <p className="font-bold text-[1.1rem] text-center absolute left-1/2 -translate-x-1/2 truncate w-[50%]">
        {title}
      </p>
    </div>
  );
};
