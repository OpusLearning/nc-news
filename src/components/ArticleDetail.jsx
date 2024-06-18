import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import CommentsList from "./CommentsList";
import "./ArticleDetail.css";

const ArticleDetail = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true); // Include in case of rerender
    setError(null);

    getArticleById(article_id)
      .then((data) => {
        setArticle(data.article);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Failed to find article.");
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="article-detail">
      {article ? (
        <>
          <h1>{article.title}</h1>
          <img src={article.article_img_url} alt={article.title} />
          <p>By {article.author}</p>
          <p>{new Date(article.created_at).toLocaleDateString()}</p>
          <p>{article.body}</p>
          <div className="article-footer">
            <br /> <br />
            <span>{article.votes} votes</span>
            <br />
            <span>{article.comment_count} comments</span>
            <br />
          </div>
          <CommentsList article_id={article_id} />
        </>
      ) : (
        <p>Article not found</p>
      )}
    </div>
  );
};

export default ArticleDetail;
