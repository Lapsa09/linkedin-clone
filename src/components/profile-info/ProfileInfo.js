import { Avatar } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfoModalState,
  openInfoModal,
} from "../../features/infoModalSlice";
import { selectUser } from "../../features/userSlice";
import { ProfModal, ImgUploader } from "../";
import { useForm } from "react-hook-form";
import "./profileInfo.css";

function ProfileInfo() {
  const user = useSelector(selectUser);
  const { control, setValue } = useForm();
  const modal = useSelector(getInfoModalState);
  const dispatch = useDispatch();

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
            <ImgUploader
              uid={user.uid}
              name="profilepic"
              profile
              control={control}
              setValue={setValue}
            />
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
