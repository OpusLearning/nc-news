import React from "react";
import CommentCard from "./CommentsCard";
import "./CommentsList.css";

const CommentsList = ({ comments, onDelete }) => {
  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <CommentCard
          key={comment.comment_id}
          comment={comment}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CommentsList;
