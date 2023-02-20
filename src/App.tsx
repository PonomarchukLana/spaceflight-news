import React from "react";
import { Routes, Route } from "react-router-dom";
import loadable from '@loadable/component'
import "./App.css";

const HomePage = loadable(() => import("./views/HomePage"));
const ArticlePage = loadable(() => import("./views/ArticlePage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/article/:id" element={<ArticlePage />} />
    </Routes>
  );
}

export default App;
