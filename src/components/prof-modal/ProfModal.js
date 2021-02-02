import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeInfoModal } from "../../features/infoModalSlice";
import { login, selectUser } from "../../features/userSlice";
import { auth, db } from "../../firebase";
import "./profModal.css";

function ProfModal() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        setFirstName(doc.data().name);
        setLastName(doc.data().lastName);
        setDescription(doc.data().description);
      });
  }, []);

  const updateProfile = () => {
    auth.currentUser().updateProfile({
      displayName: `${firstName} ${lastName}`,
    });
    db.collection("users").doc(user.uid).update({
      name: firstName,
      lastName,
      description,
    });

    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const { name, lastName, profilePic, description, email } = doc.data();
        dispatch(
          login({
            name,
            lastName,
            uid: doc.id,
            photoURL: profilePic,
            email,
            description,
          })
        );
      });

    dispatch(closeInfoModal());
  };

  return (
    <div className="profModal-background">
      <div className="profModal">
        <div className="modal__header">
          <h2>Add new skill </h2>
          <Close onClick={() => dispatch(closeInfoModal())} />
        </div>
        <form>
          <label htmlFor="">
            First Name:{" "}
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
            />
          </label>
          <label htmlFor="">
            Last Name:{" "}
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
            />
          </label>
          <label htmlFor="">
            Description:{" "}
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />
          </label>
          <button onClick={updateProfile} type="submit">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfModal;
