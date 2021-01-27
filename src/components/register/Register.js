import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../features/userSlice";
import { auth, db, store } from "../../firebase";
import "./register.css";

function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const storageRef = store.ref();
    const fileRef = storageRef.child("profilePics/", file.name);
    await fileRef.put(file);
    setPhotoURL(await fileRef.getDownloadURL());
  };

  const register = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, password).then((userAuth) => {
      userAuth.user
        .updateProfile({
          displayName: `${name} ${lastName}`,
          photoURL,
        })
        .then(() => {
          db.collection("users")
            .add({
              name,
              lastName,
              description,
              email,
              profilePic: photoURL,
            })
            .then((user) => {
              db.collection("users")
                .doc(user.id)
                .get()
                .then((doc) => {
                  dispatch(
                    login({
                      name: doc.name,
                      lastName: doc.lastName,
                      photoURL: doc.profilePic,
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
        <input type="file" onChange={handleFile} />
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
