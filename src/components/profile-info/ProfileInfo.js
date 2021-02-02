import { Avatar } from "@material-ui/core";
import { EditOutlined } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfoModalState,
  openInfoModal,
} from "../../features/infoModalSlice";
import { selectUser } from "../../features/userSlice";
import ProfModal from "../prof-modal/ProfModal";
import "./profileInfo.css";

function ProfileInfo() {
  const user = useSelector(selectUser);
  const modal = useSelector(getInfoModalState);
  const dispatch = useDispatch();
  return (
    <div className="profileInfo">
      <img
        src="https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1062&q=80"
        alt=""
      />
      <div className="profile__text">
        <div className="profile__media">
          <Avatar src={user.photoURL} className="profile__avatar">
            {user.email[0].toUpperCase()}
          </Avatar>
          <div className="profile__buttons">
            <button className="button add">Add Section</button>
            <button className="button more">More...</button>
            <EditOutlined
              className="edit"
              onClick={() => dispatch(openInfoModal())}
            />
          </div>
        </div>
        <h2>{`${user.name} ${user.lastName}`}</h2>
        <p>{user.description}</p>
        <p>Argentina</p>
      </div>
      {modal && <ProfModal />}
    </div>
  );
}

export default ProfileInfo;
