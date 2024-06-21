import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getArticleComments } from "../api";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";
import "./ArticleDetail.css";
import ArticleVotes from "./ArticleVotes";

const ArticleDetail = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]); // comments now in state

  useEffect(() => {
    setIsLoading(true);
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

    getArticleComments(article_id).then((data) => {
      setComments(data.comments || []);
    });
  }, [article_id]);

  const handleCommentSubmit = (newComment) => {
    setComments([newComment, ...comments]); // add the comment to the array
  };

  const handleDeleteComment = (comment_id) => {
    setComments(
      (prevComments) =>
        prevComments.filter((comment) => comment.comment_id !== comment_id) // remove comment
    );
  };

  if (isLoading) return <div className="loading"></div>;
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
            <ArticleVotes
              article_id={article_id}
              initialVotes={article.votes}
            />
            <br />
            <CommentForm
              article_id={article_id}
              onCommentSubmit={handleCommentSubmit}
            />
            <span>{article.comment_count} comments</span>
          </div>
          <CommentsList comments={comments} onDelete={handleDeleteComment} />
        </>
      ) : (
        <p>Article not found</p>
      )}
    </div>
  );
};

export default ArticleDetail;
