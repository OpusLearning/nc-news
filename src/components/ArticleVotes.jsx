import React, { useState } from "react";
import { patchArticleVotes } from "../api";
import "./ArticleVotes.css";

const ArticleVotes = ({ article_id, initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleVote = (increment) => {
    setIsLoading(true);
    setError(null);

    setVotes((prevVotes) => prevVotes + increment); // ++ / -- when called

    patchArticleVotes(article_id, increment)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setVotes((prevVotes) => prevVotes - increment); // if we cant update  minus the  score
        setError("Failed to update votes.");
        setIsLoading(false);
      });
  };

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="votes">
      <p>Votes: {votes}</p>
      <button onClick={() => handleVote(1)} disabled={isLoading}>
        Upvote
      </button>
      <button onClick={() => handleVote(-1)} disabled={isLoading}>
        Downvote
      </button>
    </div>
  );
};

export default ArticleVotes;
