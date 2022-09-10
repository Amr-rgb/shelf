import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { BooksContextProvider } from "./context/BooksContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <BooksContextProvider>
        <App />
      </BooksContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
