import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import "./headerOption.css";

function HeaderOption({ avatar, Icon, title, onClick }) {
  const user = useSelector(selectUser);
  return (
    <div onClick={onClick} className="header-option">
      {Icon && <Icon className="header-option__icon" />}
      {avatar && (
        <Avatar src={user.photoURL} className="header-option__icon">
          {user.email[0].toUpperCase()}
        </Avatar>
      )}
      <h3 className="header-option__title">{title}</h3>
    </div>
  );
}

export default HeaderOption;
