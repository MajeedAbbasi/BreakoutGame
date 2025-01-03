import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Breakout from "./Componets/Breakout";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Breakout />} />
          <Route path="/breakout" element={<h1>Home</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
