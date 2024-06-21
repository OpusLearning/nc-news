import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

const TopicPage = () => {
  const { topic_slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticles()
      .then((data) => {
        const filteredArticles = data.filter(
          (article) => article.topic === topic_slug
        );
        setArticles(filteredArticles);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch articles.");
        setIsLoading(false);
      });
  }, [topic_slug]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="topic-page">
      <h2>
        {topic_slug.charAt(0).toUpperCase() + topic_slug.slice(1)} Articles
      </h2>
      {articles.length === 0 ? (
        <p className="error-message">No articles found for this topic.</p>
      ) : (
        <div className="articles-list">
          {articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicPage;
