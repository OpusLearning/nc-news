// rewritten in menu

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../api";
const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTopics()
      .then((data) => {
        setTopics(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch topics.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="topics-list">
      <h2>Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicList;
