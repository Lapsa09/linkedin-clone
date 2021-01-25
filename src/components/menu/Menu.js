import { Avatar } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";
import { auth } from "../../firebase";
import { selectUser } from "../../features/userSlice";
import "./menu.css";

function Menu() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };
  return (
    <div className="menu">
      <div className="menu__profile">
        <Avatar className="menu__avatar" src={user.photoURL}>
          {user.email[0].toUpperCase()}
        </Avatar>
        <div className="menu__profileInfo">
          <h2>{`${user.name} ${user.lastName}`}</h2>
          <p>{user.description}</p>
        </div>
      </div>
      <button>View Profile</button>
      <div className="menu__tab">
        <h3>Account</h3>
        <p>Settings & Privacy</p>
        <p>Help</p>
        <p>Language</p>
      </div>
      <div className="menu__tab">
        <h3>Manage</h3>
        <p>Posts & Activity</p>
        <p>Job Posting Account</p>
      </div>
      <div className="menu__tab">
        <p onClick={logoutOfApp}>Sign Out</p>
      </div>
    </div>
  );
}

export default Menu;
