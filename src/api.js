import axios from "axios";

const api = axios.create({
  baseURL: "https://ncnews-trt9.onrender.com/api",
});

export const getArticles = () => {
  return api.get("/articles").then((response) => response.data.articles);
};

export const getArticleById = (article_id) => {
  const url = `/articles/${article_id}`;
  return api.get(url).then((response) => response.data);
};

export const getArticleComments = (article_id) => {
  const url = `/articles/${article_id}/comments`;
  return api.get(url).then((response) => response.data);
};

export const patchArticleVotes = (article_id, inc_votes) => {
  const url = `/articles/${article_id}`;
  return api.patch(url, { inc_votes }).then((response) => response.data);
};
