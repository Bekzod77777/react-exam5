import React, { useState } from "react";
import "./Login.scss";
import { AuthUser } from "../../utils/auth";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { login } = AuthUser();

  const handleChange = (e) => {
    setUserData((prevState) => {
      setUserData({
        ...prevState,
        [e.target.name]: e.target.value,
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userData);
    setUserData({
      email: "",
      password: "",
    });
    navigate("/home");
  };

  return (
    <div className="login">
      <div className="container">
        <div className="login-heading">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            required="true"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={userData?.email}
            onChange={handleChange}
          />
          <input
            required="true"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={userData?.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
