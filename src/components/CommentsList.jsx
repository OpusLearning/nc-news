import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleComments } from "../api";
import CommentsCard from "./CommentsCard";
import "./CommentsList.css";

const CommentsList = () => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getArticleComments(article_id)
      .then((data) => {
        setComments(data.comments);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch comments.");
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <CommentsCard key={comment.comment_id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsList;
