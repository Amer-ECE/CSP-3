import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandPage from "./pages/LandPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Bag from "./pages/Bag";
import Orders from "./pages/Orders";
import AllOrders from "./pages/AllOrders";
import Home from "./pages/Home";
import Error from "./pages/Error";

import { UserProvider } from "./UserContext";
import { CartProvider } from "react-use-cart";

import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  const unsetUser = () => {
    localStorage.clear();
    setUser({
      id: null,
      isAdmin: null,
    });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data._id !== "undefined") {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
          });
        }
      });
  }, []);

  return (
    <>
      <ToastContainer />
      <CartProvider>
        <AnimatePresence exitBeforeEnter>
          <UserProvider value={{ user, setUser, unsetUser }}>
            <Router>
              <Routes>
                <Route exact path="/" element={<LandPage />} />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/products" element={<Products />} />
                <Route
                  exact
                  path="/products/:productId"
                  element={<ProductDetails />}
                />
                <Route exact path="/bag" element={<Bag />} />
                <Route exact path="/orders" element={<Orders />} />
                <Route exact path="/allOrders" element={<AllOrders />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </Router>
          </UserProvider>
        </AnimatePresence>
      </CartProvider>
    </>
  );
}

export default App;
