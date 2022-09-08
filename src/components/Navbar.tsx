import {
  HomeIcon,
  MagnifyingGlassIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";

export const Navbar = () => {
  return (
    <div className="nav z-50 py-4 pb-6 fixed bottom-0 left-0 right-0">
      <div className="px-4 flex items-center justify-between">
        <div className="rounded-3xl cursor-pointer">
          <MagnifyingGlassIcon className="p-2 w-11" />
        </div>

        <div className="bg-white p-5 rounded-3xl">
          <HomeIcon className="p-2 w-11" />
        </div>

        <div className="rounded-3xl cursor-pointer">
          <QueueListIcon className="p-2 w-11" />
        </div>
      </div>
    </div>
  );
};
