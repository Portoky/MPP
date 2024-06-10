import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  function handleSubmit(event: { preventDefault: () => void }): void {
    event.preventDefault();
    const postData = {
      username: username,
      password: password,
      role: role,
    };
    axios
      .post(
        "http://localhost:8080/auth/register",
        postData
      )
      .then((response) => {
        const bearerToken = response.data;
        sessionStorage.setItem("bearerToken", bearerToken["token"]); //session management ig
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <>
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
        <div>
          <label htmlFor="password">Role:</label>
          <select
            name="roleSelect"
            id="roleSelect"
            onChange={(e) => {
              setRole(e.target.value);
              console.log(role);
            }}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="ARTIST">Artist</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
