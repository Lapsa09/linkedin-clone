import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { login } from "../../features/userSlice";
import { useForm } from "react-hook-form";
import { signIn } from "../../services/user.service";
import "./login.css";

function Login() {
  const [error, setError] = useState("");
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();

  const loginToApp = async (data) => {
    try {
      const res = await signIn(data);
      dispatch(login(res));
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="login">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1280px-LinkedIn_Logo.svg.png"
        alt=""
      />
      <form onSubmit={handleSubmit(loginToApp)}>
        <input {...register("email")} type="email" placeholder="Email" />
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
        />
        <span>{error}</span>
        <button type="submit">Log In</button>
      </form>

      <p>
        Not a member?
        <NavLink to="/register" style={{ textDecoration: "none" }}>
          <span className="login__register">Register Now</span>
        </NavLink>
      </p>
    </div>
  );
}

export default Login;
