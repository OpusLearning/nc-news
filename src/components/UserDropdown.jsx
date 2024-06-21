import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext.jsx"; // Ensure correct path and extension
import axios from "axios";

const UserDropdown = () => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://ncnews-trt9.onrender.com/api/users") // Replace with your actual API URL
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleUserChange = (event) => {
    const selectedUser = users.find((u) => u.username === event.target.value);
    setUser(selectedUser);
  };

  return (
    <select onChange={handleUserChange} value={user ? user.username : ""}>
      <option value="" disabled>
        Select a user
      </option>
      {users.map((user) => (
        <option key={user.username} value={user.username}>
          {user.username}
        </option>
      ))}
    </select>
  );
};

export default UserDropdown;
