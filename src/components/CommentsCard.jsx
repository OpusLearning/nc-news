import React, { useState } from "react";
import "./CommentCard.css";
import { deleteComment } from "../api";

const username = "cooljmessy";
const CommentCard = ({ comment, onDelete }) => {
  const { comment_id, author, created_at, body, votes } = comment;
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = () => {
    setIsDeleting(true);
    setError(null);
    deleteComment(comment_id)
      .then(() => {
        onDelete(comment_id);
      })
      .catch((error) => {
        setIsDeleting(false);
        setError("Failed to delete.");
      });
  };

  return (
    <div className="comment-card">
      <p>By {author}</p>
      <p>{new Date(created_at).toLocaleDateString()}</p>
      <div className="comment-body">
        <span>{body}</span>
        <br />
        <span>{votes} votes</span>
      </div>
      {author === username && (
        <>
          <button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </>
      )}
    </div>
  );
};

export default CommentCard;
