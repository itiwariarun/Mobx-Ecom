import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import App from "./App";
import { cartStore } from "./store";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider cartStore={cartStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
