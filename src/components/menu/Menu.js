import { Avatar } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";
import { auth } from "../../firebase";
import { selectUser } from "../../features/userSlice";
import "./menu.css";
import HeaderOption from "../header-option/HeaderOption";
import { toggleMenu, toggleOpen } from "../../features/menuSlice";
import { Link } from "react-router-dom";

function Menu() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const menu = useSelector(toggleMenu);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (dropdownRef.current !== null) dispatch(toggleOpen());
    };

    if (menu) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => window.removeEventListener("click", pageClickEvent);
  }, [menu]);

  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };
  return (
    <div className="menu_total">
      <HeaderOption
        onClick={() => dispatch(toggleOpen())}
        avatar={true}
        title="Me"
      />
      {menu && (
        <div ref={dropdownRef} className="menu">
          <div className="menu__profile">
            <Avatar className="menu__avatar" src={user.photoURL}>
              {user.email[0].toUpperCase()}
            </Avatar>
            <div className="menu__profileInfo">
              <h2>{`${user.name} ${user.lastName}`}</h2>
              <p>{user.description}</p>
            </div>
          </div>
          <Link className="link" to="/profile">
            <button>View Profile</button>
          </Link>
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
      )}
    </div>
  );
}

export default Menu;
