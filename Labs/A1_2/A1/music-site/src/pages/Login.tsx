import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event): void {
    event.preventDefault();
    const postData = {
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:8080/auth/authenticate", postData)
      .then((response) => {
        console.log("hello");
        const bearerToken = response.data;
        sessionStorage.setItem("username", username); //save username
        sessionStorage.setItem("bearerToken", bearerToken["token"]); //session management ig
        //saving the users role
        axios
          .get("http://localhost:8080/userrole", {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
            },
          })
          .then((response) => {
            console.log(response.data);
            sessionStorage.setItem("role", response.data);
          });

        navigate("/");
      });
  }

  function handleRegisterNav(): void {
    navigate("/register");
  }

  return (
    <>
      <div className="authForm">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <button onClick={handleRegisterNav}>Register</button>
      </div>
    </>
  );
};

export default Login;
