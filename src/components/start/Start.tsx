import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Start = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <div>
        <img src="/logo.svg" alt="logo" />
      </div>

      <div className="mt-20 w-[75vw] mx-auto rounded-3xl overflow-hidden relative">
        <div className="w-[75vw] h-[75vw] bg-gradient-to-b from-white to-transparent"></div>
        <img
          className="absolute left-0 top-0 w-full h-full"
          src="/art.svg"
          alt="shelf illustration"
        />
      </div>

      <div className="-mt-4 pb-20 flex flex-col items-center space-y-12">
        <h1 className="font-play font-bold text-6xl text-center leading-tight">
          Track Your Readings In One Place
        </h1>
        <Link
          to={`${
            window.localStorage.getItem("userName") ? "/home" : "/preferences"
          }`}
        >
          <button className="bg-offWhite w-60 py-5 rounded-2xl font-semibold text-lg">
            Let&#39;s Start
          </button>
        </Link>
      </div>
    </motion.div>
  );
};
