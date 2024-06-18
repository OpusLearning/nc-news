import React from "react";
import "./CommentCard.css";

const CommentCard = ({ comment }) => {
  const { author, created_at, votes, body } = comment;

  return (
    <div className="comment-card">
      <p>By {author}</p>
      <p>{new Date(created_at).toLocaleDateString()}</p>
      <div className="comment-footer">
        <span>{body}</span>
        <span>{votes} votes</span>
      </div>
    </div>
  );
};

export default CommentCard;
