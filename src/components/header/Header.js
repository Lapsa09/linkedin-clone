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
import SearchBar from "../searchBar/SearchBar";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getWidth } from "../../features/widthSlice";

function Header() {
  const history = useHistory();

  const { width } = useSelector(getWidth);

  const goHome = () => {
    history.push("/");
  };
  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://image.flaticon.com/icons/png/512/174/174857.png"
          alt=""
        />

        {width > 675 ? (
          <SearchBar />
        ) : (
          <HeaderOption Icon={Search} title="Search" />
        )}
      </div>

      <div className="header__right">
        <HeaderOption Icon={Home} title="Home" onClick={goHome} />

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
