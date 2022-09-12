import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

type ToastType = {
  show: boolean;
  success: boolean;
  message: string;
};

export const Toast = ({ show, success, message }: ToastType) => {
  return (
    <div
      className="z-[999] fixed w-full left-1/2 -translate-x-1/2 flex justify-center duration-500"
      style={{ top: show ? "2rem" : "-5rem" }}
    >
      <div className="w-fit px-10 py-6 rounded-xl bg-white shadow-sm flex items-center space-x-2">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: success ? "#28353c" : "#f00" }}
        >
          {success ? (
            <CheckIcon className="w-3 stroke-2 text-white" />
          ) : (
            <XMarkIcon className="w-3 stroke-2 text-white" />
          )}
        </div>

        <p>{message}</p>
      </div>
    </div>
  );
};
