import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import App from "./App";
import { CartProvider } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </StrictMode>
);
