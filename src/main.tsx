import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LibraryContextProvider } from "./context/LibraryContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LibraryContextProvider>
        <App />
      </LibraryContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
