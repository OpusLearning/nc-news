import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ArticlesList from "./components/ArticlesList";
import ArticleDetail from "./components/ArticleDetail";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import Nav from "./components/Nav";
import TopicPage from "./components/TopicPage";
import "./global.css";
import "./index.css";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/articles/:article_id" element={<ArticleDetail />} />
          <Route path="/topics/:topic_slug" element={<TopicPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
