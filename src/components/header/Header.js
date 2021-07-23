import {
  BusinessCenter,
  Chat,
  Home,
  Notifications,
  Search,
  SupervisorAccount,
  MoreHoriz,
} from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import HeaderOption from "../header-option/HeaderOption";
import "./header.css";
import SearchBar from "../searchBar/SearchBar";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getWidth } from "../../features/widthSlice";
import StyledMenu, {
  CustomMenu,
  CustomMenuItem,
} from "../styledMenu/StyledMenu";

function Header() {
  const history = useHistory();

  const { width } = useSelector(getWidth);

  const hiddenButtonsRef = useRef(null);
  const hiddenSearchRef = useRef(null);

  const [showIcons, setShowIcons] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const goHome = () => {
    history.push("/");
  };

  useEffect(() => {
    const pageClickEventA = (e) => {
      if (hiddenButtonsRef.current !== null) toggleIcons();
    };

    if (showIcons) {
      window.addEventListener("click", pageClickEventA);
    }

    return () => window.removeEventListener("click", pageClickEventA);
  }, [showIcons]);

  useEffect(() => {
    const pageClickEventB = (e) => {
      if (hiddenSearchRef.current !== null) toggleSearchBar();
    };

    if (showSearchBar) {
      window.addEventListener("click", pageClickEventB);
    }

    return () => window.removeEventListener("click", pageClickEventB);
  }, [showSearchBar]);

  const toggleIcons = () => {
    setShowIcons(!showIcons);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
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
            {showSearchBar && (
              <div ref={hiddenSearchRef} className="hiddenSearchBar">
                <SearchBar />
              </div>
            )}
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
              <CustomMenuItem>
                <HeaderOption Icon={Chat} title="Messaging" />
              </CustomMenuItem>
              <CustomMenuItem>
                <HeaderOption Icon={Notifications} title="Notifications" />
              </CustomMenuItem>
              <CustomMenuItem>
                <StyledMenu />
              </CustomMenuItem>
            </CustomMenu>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
