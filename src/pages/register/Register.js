import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../redux/userSlice";
import { signUp } from "../../services/user.service";
import "./register.css";

function Register() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();

  const registerEvent = async (data) => {
    try {
      const res = await signUp(data);
      dispatch(login(res));
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div className="register">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1280px-LinkedIn_Logo.svg.png"
        alt=""
      />
      <form onSubmit={handleSubmit(registerEvent)}>
        <input {...register("name")} placeholder="First Name" type="text" />
        <input {...register("lastName")} placeholder="Last Name" type="text" />
        <input
          {...register("description")}
          placeholder="Description"
          type="text"
        />
        <input {...register("email")} type="email" placeholder="Email" />
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
        />
        <span>{error}</span>
        <button type="submit">Register</button>
      </form>
      <p>
        Already registered?
        <NavLink to="/login" style={{ textDecoration: "none" }}>
          <span className="register__login">Sign In</span>
        </NavLink>
      </p>
    </div>
  );
}

export default Register;
