import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import apiHandler from "../../api/apiHandler";
import useAuth from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
import "./FormSignIn.css";

const FormSignIn = () => {
  const [{ email, password }, handleChange] = useForm({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    apiHandler
      .signin({ email, password })
      .then((res) => {
        console.log(res);
        storeToken(res.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((e) => {
        setError(e.response);
      });
  };

  return (
    <div className="middle-div-min">
      <section class="signin" id="form">
        <img
          className="logo-octopus-sign-in-page"
          src="images/logos/intro-logo.png"
        ></img>
        {error && <h3 className="error">{error.message}</h3>}
        <form id="signin-form" onSubmit={handleSubmit}>
          <h2 className="log-in-word-log-in-page">Log in</h2>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            className="signin-input"
            name="email"
            onChange={handleChange}
            value={email}
            placeholder="Email adress"
          />
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            className="signin-input"
            name="password"
            onChange={handleChange}
            value={password}
            placeholder="Password"
          />
          <button className="log-in-button-log-in-page">LOG IN</button>
        </form>
      </section>
    </div>
  );
};

export default FormSignIn;

// const token = localStorage.getItem('authToken')

// axios.get("http://localhost:8080/api/private", {
// 	headers: {
// 		Authorization: `Bearer ${token}` ,
// 	},
// })
