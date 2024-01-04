import React from "react";
import ReactDOM from "react-dom/client";
import Modal from "react-modal";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { QuioscoProvider } from "./context/QuioscoProvider";
import Router from "./router";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuioscoProvider>
      <RouterProvider router={Router} />
    </QuioscoProvider>
  </React.StrictMode>
);
