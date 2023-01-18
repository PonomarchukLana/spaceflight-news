import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const HomePage = lazy(() => import("./views/HomePage"));
const ArticlePage = lazy(() => import("./views/ArticlePage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/article/:id" element={<ArticlePage />} />
    </Routes>
  );
}

export default App;
