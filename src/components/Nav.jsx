import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../api";
import "./Nav.css";

const Nav = () => {
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

  if (isLoading) return <nav>Loading...</nav>;
  if (error) return <nav>{error}</nav>;

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        {topics.map((topic) => (
          <li key={topic.slug} className="nav-item">
            <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
          </li>
        ))}
      </ul>
      {error && <p className="error-message">{error}</p>}
    </nav>
  );
};

export default Nav;
