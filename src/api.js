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
