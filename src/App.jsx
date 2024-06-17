import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ArticlesList from "./components/ArticlesList";
import Header from "./components/Header";
import Nav from "./components/Nav";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<ArticlesList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
