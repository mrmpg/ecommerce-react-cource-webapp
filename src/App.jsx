import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Home from "./Pages/Home";
import CheckOut from "./Pages/CheckOut";
import Auth from "./Pages/Auth";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";
import ProductDetails from "./Pages/ProductDetails";
import CartProvider from "./context/CartContext";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
