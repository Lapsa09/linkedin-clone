import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../features/userSlice";
import { auth, getUserData } from "../../firebase";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const loginToApp = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then((userAuth) => {
      getUserData(userAuth.user.email)
        .then((doc) =>
          dispatch(
            login({
              name: doc.name,
              lastName: doc.lastName,
              uid: userAuth.user.uid,
              photoURL: doc.profilePic,
              email: doc.email,
              description: doc.description,
            })
          )
        )
        .catch((err) => setError(err.message));
    });
  };
  return (
    <div className="login">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1280px-LinkedIn_Logo.svg.png"
        alt=""
      />
      <form>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <span>{error}</span>
        <button onClick={loginToApp} type="submit">
          Log In
        </button>
      </form>

      <p>
        Not a member?{" "}
        <Link to="/register" style={{ textDecoration: "none" }}>
          <span className="login__register">Register Now</span>
        </Link>
      </p>
    </div>
  );
}

export default Login;
