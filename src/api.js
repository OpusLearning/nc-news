import axios from "axios";

const api = axios.create({
  baseURL: "https://ncnews-trt9.onrender.com/api",
});

export const getArticles = async (params = {}) => {
  const queryStr = new URLSearchParams(params).toString();
  const response = await api.get(`/articles?${queryStr}`);
  return response.data.articles;
};

export const getArticleById = (article_id) => {
  const url = `/articles/${article_id}`;
  return api.get(url).then((response) => response.data);
};

export const getArticleComments = (article_id) => {
  const url = `/articles/${article_id}/comments`;
  return api.get(url).then((response) => {
    return { comments: response.data.comments || [] };
  });
};

export const patchArticleVotes = (article_id, inc_votes) => {
  const url = `/articles/${article_id}`;
  return api.patch(url, { inc_votes }).then((response) => response.data);
};

export const postComment = (article_id, commentData) => {
  const url = `/articles/${article_id}/comments`;
  return api.post(url, commentData).then((response) => response.data);
};

export const deleteComment = (comment_id) => {
  const url = `/comments/${comment_id}`;
  return api.delete(url).then((response) => response.data);
};

export const getTopics = () => {
  return api.get("/topics").then((response) => response.data.topics);
};
