import React, { useState } from "react";
import "./CommentForm.css";
import { postComment } from "../api";

const CommentForm = ({ article_id, onCommentSubmit }) => {
  const [body, setBody] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const commentData = {
      username: "cooljmessy", // will add user context when other core work complete
      body: body,
    };

    postComment(article_id, commentData).then((newComment) => {
      setBody("");
      onCommentSubmit(newComment.comment);
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
