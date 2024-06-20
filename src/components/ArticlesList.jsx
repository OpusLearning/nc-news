import React, { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import "./ArticlesList.css";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sort_by, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

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

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleOrderChange = () => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortedArticles = [...articles].sort((a, b) => {
    // workaround need to investigate why backend not returning results despite passing jest tests
    if (order === "asc") {
      return a[sort_by] > b[sort_by] ? 1 : -1;
    } else {
      return a[sort_by] < b[sort_by] ? 1 : -1;
    }
  });

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <div className="sort-controls">
        <label htmlFor="sort_by">Sort by:</label>
        <select id="sort_by" value={sort_by} onChange={handleSortChange}>
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
        </select>
        <button onClick={handleOrderChange}>
          Order: {order === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>
      <div className="articles-list">
        {sortedArticles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
