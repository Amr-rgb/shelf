import { BellIcon } from "@heroicons/react/24/outline";

export const Header = () => {
  return (
    <div className="py-4 mb-14 flex items-center justify-between relative">
      <div className="space-y-2 cursor-pointer">
        <span className="block w-8 h-[3px] rounded-full bg-black"></span>
        <span className="block w-6 h-[3px] rounded-full bg-black"></span>
        <span className="block w-8 h-[3px] rounded-full bg-black"></span>
      </div>

      <p className="font-bold text-[1.1rem] absolute left-1/2 -translate-x-1/2">
        My Profile
      </p>

      <BellIcon className="w-8 cursor-pointer" />
    </div>
  );
};
