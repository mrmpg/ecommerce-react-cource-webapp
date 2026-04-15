import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Home from "./Pages/Home";
import CheckOut from "./Pages/CheckOut";
import Auth from "./Pages/Auth";

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
