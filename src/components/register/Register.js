import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../features/userSlice";
import { auth, db } from "../../firebase";
import "./register.css";

function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const register = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, password).then((userAuth) => {
      userAuth.user
        .updateProfile({
          displayName: `${name} ${lastName}`,
        })
        .then(() => {
          db.collection("users")
            .doc(userAuth.user.uid)
            .set({
              name,
              lastName,
              description,
              email,
              profilePic: "",
            })
            .then(() => {
              db.collection("users")
                .doc(userAuth.user.uid)
                .get()
                .then((doc) => {
                  dispatch(
                    login({
                      name: doc.name,
                      lastName: doc.lastName,
                      uid: userAuth.user.uid,
                      description: doc.description,
                      email: doc.email,
                    })
                  );
                });
            });
        })
        .catch((err) => setError(err));
    });
  };
  return (
    <div className="register">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1280px-LinkedIn_Logo.svg.png"
        alt=""
      />
      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First Name"
          type="text"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          type="text"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          type="text"
        />
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
        <button onClick={register} type="submit">
          Register
        </button>
      </form>
      <p>
        Already register?{" "}
        <Link to="/login" style={{ textDecoration: "none" }}>
          <span className="register__login">Sign In</span>
        </Link>
      </p>
    </div>
  );
}

export default Register;
