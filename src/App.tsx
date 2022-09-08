import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/home/Home";

function App() {
  return (
    <div className="App px-4 py-8 pb-44">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Navbar />
    </div>
  );
}

export default App;
