import React from "react";
import "./ArticleCard.css";
const ArticleCard = ({ article }) => {
  const { title, author, created_at, comment_count, votes } = article;

  return (
    <div className="article-card">
      <h2>{title}</h2>
      <p>By {author}</p>
      <p>{new Date(created_at).toLocaleDateString()}</p>

      <span>{comment_count} comments</span>
      <br />
      <span>{votes} votes</span>
    </div>
  );
};

export default ArticleCard;
