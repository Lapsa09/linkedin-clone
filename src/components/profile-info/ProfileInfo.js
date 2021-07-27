import { Avatar } from "@material-ui/core";
import { EditOutlined, PhotoCamera } from "@material-ui/icons";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfoModalState,
  openInfoModal,
} from "../../features/infoModalSlice";
import { login } from "../../features/userSlice";
import { selectUser } from "../../features/userSlice";
import { auth, db, getPostsById, store } from "../../firebase";
import ProfModal from "../prof-modal/ProfModal";
import "./profileInfo.css";

function ProfileInfo() {
  const user = useSelector(selectUser);
  const modal = useSelector(getInfoModalState);
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);
  const [imgLink, setImgLink] = useState("");

  const openClick = () => {
    hiddenFileInput.current.click();
  };

  const handleImg = async (e) => {
    const file = e.target.files[0];
    const storageRef = store.ref();
    const fileRef = storageRef.child(`profilePics/${user.uid}/${file.name}`);
    await fileRef.put(file);
    const img = await fileRef.getDownloadURL();
    setImgLink(img);

    auth.currentUser.updateProfile({
      photoURL: img,
    });
    db.collection("users").doc(user.uid).update({
      profilePic: img,
    });
    dispatch(
      login({
        ...user,
        photoURL: img,
      })
    );
  };

  useEffect(() => {
    getPostsById(user.uid).then((posts) => {
      posts.forEach((post) => {
        db.collection("posts").doc(post).update({
          photoURL: imgLink,
        });
      });
    });
  }, [user.photoURL]);
  return (
    <div className="profileInfo">
      <img
        src="https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1062&q=80"
        alt=""
      />

      <div className="profile__media">
        <div className="profile__media__desc">
          <div className="profile__media__avatar">
            <Avatar src={user.photoURL} className="profile__avatar">
              {user.email[0].toUpperCase()}
            </Avatar>
            <PhotoCamera onClick={openClick} />
            <input type="file" ref={hiddenFileInput} onChange={handleImg} />
          </div>
          <h2>{`${user.name} ${user.lastName}`}</h2>
          <p>{user.description}</p>
          <p>Argentina</p>
        </div>
        <div className="profile__buttons">
          <button className="button add">Add Section</button>
          <button className="button more">More...</button>

          <EditOutlined
            className="edit"
            onClick={() => dispatch(openInfoModal())}
          />
        </div>
      </div>

      {modal && <ProfModal />}
    </div>
  );
}

export default ProfileInfo;
