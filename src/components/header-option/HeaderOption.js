import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { getWidth } from "../../features/widthSlice";
import "./headerOption.css";

function HeaderOption({ avatar, Icon, title, onClick }) {
  const user = useSelector(selectUser);

  const { width } = useSelector(getWidth);

  return (
    <div onClick={onClick} className="header-option">
      {Icon && (
        <Icon className={`header-option__icon ${width < 500 && "res"}`} />
      )}
      {avatar && (
        <Avatar
          src={user.photoURL}
          className={`header-option__icon ${width < 500 && "res"}`}
        >
          {user.email[0].toUpperCase()}
        </Avatar>
      )}
      {width > 500 && <h3 className="header-option__title">{title}</h3>}
    </div>
  );
}

export default HeaderOption;
