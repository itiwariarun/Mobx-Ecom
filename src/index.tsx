import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import App from "./App";
import { cartStore } from "./store";
import { StrictMode } from "react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider cartStore={cartStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
