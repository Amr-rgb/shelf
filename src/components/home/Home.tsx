import { Header } from "./Header";
import { Main } from "./Main";
import { Latest } from "./Latest";
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <Header />
      <Main />
      <Latest />
    </motion.div>
  );
};
