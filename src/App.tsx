import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import OrderSuccess from "./pages/Order";
import Cart from "./pages/Cart";
import { pageTransition, pageVariants } from "./utils/constants";
import { FC } from "react";

const App: FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen h-full grid content-between">
      <Navbar />
      <section className="min-h-[calc(100dvh-121px)]">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/product/:id/details"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ProductDetail />
                </motion.div>
              }
            />
            <Route
              path="/cart"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Cart />
                </motion.div>
              }
            />
            <Route
              path="/order-success"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <OrderSuccess />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </section>
      <Footer />
    </div>
  );
};

export default App;
