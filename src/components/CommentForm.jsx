import React, { useState } from "react";
import "./CommentForm.css";
import { postComment } from "../api";

const CommentForm = ({ article_id, onCommentSubmit }) => {
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const commentData = {
      username: "cooljmessy", // will add user context when other core work complete
      body: body,
    };

    postComment(article_id, commentData)
      .then((newComment) => {
        setBody("");
        onCommentSubmit(newComment.comment);
        setIsSubmitting(false);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(
          "Failed to post comment please ensure you  enter the comment in the text area."
        );
      });
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="body">Comment:</label>
        <textarea
          id="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          required
        ></textarea>
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default CommentForm;
