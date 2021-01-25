import {
  BusinessCenter,
  Chat,
  Home,
  Notifications,
  Search,
  SupervisorAccount,
} from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import HeaderOption from "../header-option/HeaderOption";
import { toggleMenu, toggleOpen } from "../../features/menuSlice";
import "./header.css";
import Menu from "../menu/Menu";

function Header() {
  const dispatch = useDispatch();

  const menu = useSelector(toggleMenu);

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
        <HeaderOption Icon={Home} title="Home" />
        <HeaderOption Icon={SupervisorAccount} title="My Network" />
        <HeaderOption Icon={BusinessCenter} title="Jobs" />
        <HeaderOption Icon={Chat} title="Messaging" />
        <HeaderOption Icon={Notifications} title="Notifications" />
        <HeaderOption
          onClick={() => dispatch(toggleOpen())}
          avatar={true}
          title="Me"
        />

        {menu && <Menu />}
      </div>
    </div>
  );
}

export default Header;
