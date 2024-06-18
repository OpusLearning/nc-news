import React from "react";
import { Link } from "react-router-dom";
import "./ArticleCard.css";

const ArticleCard = ({ article }) => {
  const { title, author, created_at, article_id, comment_count, votes } =
    article;

  return (
    <div className="article-card">
      <h2>{title}</h2>
      <p>By {author}</p>
      <p>{new Date(created_at).toLocaleDateString()}</p>
      <div className="article-footer">
        <span>{comment_count} comments</span>
        <span>{votes} votes</span>
      </div>
      <Link to={`/articles/${article_id}`}>Read More</Link>
    </div>
  );
};

export default ArticleCard;
