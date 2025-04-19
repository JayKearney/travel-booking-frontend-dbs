import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axio from '../axios'; // Adjust path if needed

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Axios instance:", axio);
    console.log("Axios baseURL:", axio.defaults.baseURL);

    axio.post("/api/User/Login", { Username: username, Password: password })
     .then((res) => {
        console.log("Response:", res);
        if (res.status === 200) {
          console.log("Login successful!");
          navigate("/home");
        } else {
          alert("Invalid username or password");
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
        alert("Invalid username or password");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

