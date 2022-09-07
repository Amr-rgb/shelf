import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Latest } from "./components/Latest";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="App px-4 py-8 pb-44">
      <Header />
      <Main />
      <Latest />
      <Navbar />
    </div>
  );
}

export default App;
