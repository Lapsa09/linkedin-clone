import {
  BusinessCenter,
  Chat,
  Home,
  Notifications,
  Search,
  SupervisorAccount,
} from "@material-ui/icons";
import React from "react";
import HeaderOption from "../header-option/HeaderOption";
import "./header.css";
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://image.flaticon.com/icons/png/512/174/174857.png"
          alt=""
        />
        <div className="header__search">
          <Search />
          <input type="text" placeholder="Search" />
        </div>
      </div>

      <div className="header__right">
        <Link to="/" style={{ textDecoration: "none" }}>
          <HeaderOption Icon={Home} title="Home" />
        </Link>
        <HeaderOption Icon={SupervisorAccount} title="My Network" />
        <HeaderOption Icon={BusinessCenter} title="Jobs" />
        <HeaderOption Icon={Chat} title="Messaging" />
        <HeaderOption Icon={Notifications} title="Notifications" />
        <Menu />
      </div>
    </div>
  );
}

export default Header;
