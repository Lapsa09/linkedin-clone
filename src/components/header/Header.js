import {
  BusinessCenter,
  Chat,
  Home,
  Notifications,
  Search,
  SupervisorAccount,
  MoreHoriz,
} from "@mui/icons-material";
import React, { useState } from "react";
import { HeaderOption, SearchBar, StyledMenu, CustomMenu } from "../";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize";
import "./header.css";

function Header() {
  const navigate = useNavigate();

  const { width } = useWindowSize();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorSr, setAnchorSr] = useState(null);

  const goHome = () => {
    navigate("/");
  };

  const toggleSearchBar = (e) => {
    setAnchorSr(e.currentTarget);
  };

  const closeSearchBar = () => {
    setAnchorSr(null);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          <>
            <HeaderOption
              onClick={toggleSearchBar}
              Icon={Search}
              title="Search"
            />

            <CustomMenu
              className="hiddenSearchBar"
              open={Boolean(anchorSr)}
              anchorEl={anchorSr}
              onClose={closeSearchBar}
            >
              <SearchBar />
            </CustomMenu>
          </>
        )}
      </div>

      <div className="header__right">
        <HeaderOption Icon={Home} title="Home" onClick={goHome} />
        <HeaderOption Icon={SupervisorAccount} title="My Network" />
        <HeaderOption Icon={BusinessCenter} title="Jobs" />
        {width > 500 ? (
          <>
            <HeaderOption Icon={Chat} title="Messaging" />
            <HeaderOption Icon={Notifications} title="Notifications" />
            <StyledMenu />
          </>
        ) : (
          <>
            <HeaderOption Icon={MoreHoriz} onClick={handleClick} />

            <CustomMenu
              className="header__hiddenButtons"
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
            >
              <HeaderOption Icon={Chat} title="Messaging" />

              <HeaderOption Icon={Notifications} title="Notifications" />

              <StyledMenu />
            </CustomMenu>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
