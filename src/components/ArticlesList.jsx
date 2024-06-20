import React, { useState, useEffect } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import "./ArticlesList.css";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    getArticles()
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch articles.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div className="loading"></div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="articles-list">
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </div>
  );
};

export default ArticlesList;
