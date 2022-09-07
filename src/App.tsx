import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Latest } from "./components/Latest";

function App() {
  return (
    <div className="App px-4 py-8">
      <Header />
      <Main />
      <Latest />
    </div>
  );
}

export default App;
