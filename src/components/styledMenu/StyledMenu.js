import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  ListItem,
  Menu,
  MenuItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";
import { toggleClose, toggleMenu, toggleOpen } from "../../features/menuSlice";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import "./styledMenu.css";
import HeaderOption from "../header-option/HeaderOption";

export const CustomMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    width: "300px",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
    }}
    {...props}
  />
));

export const CustomMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
  },
}))(MenuItem);

const StyledMenu = () => {
  const user = useSelector(selectUser);
  const menu = useSelector(toggleMenu);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="menu__total">
      <HeaderOption onClick={handleClick} avatar={true} title="Me" />

      <CustomMenu
        className="menu"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <CustomMenuItem className="menu__profile">
          <ListItemAvatar className="avatar__list">
            <Avatar className="menu__avatar" src={user.photoURL}>
              {user.email[0].toUpperCase()}
            </Avatar>
          </ListItemAvatar>
          <div className="menu__profileInfo">
            <ListItemText>
              <h2>{`${user.name} ${user.lastName}`}</h2>
            </ListItemText>
            <ListItemText>
              <p>{user.description}</p>
            </ListItemText>
          </div>
        </CustomMenuItem>
        <ListItem>
          <button className="profileButton">View Profile</button>
        </ListItem>
        <div className="menu__tab">
          <ListItemText className="tabTitle">
            <h3>Account</h3>
          </ListItemText>
          <CustomMenuItem>
            <ListItemText>
              <p>Settings & Privacy</p>
            </ListItemText>
          </CustomMenuItem>
          <CustomMenuItem>
            <ListItemText>
              <p>Help</p>
            </ListItemText>
          </CustomMenuItem>
          <CustomMenuItem>
            <ListItemText>
              <p>Language</p>
            </ListItemText>
          </CustomMenuItem>
        </div>

        <div className="menu__tab">
          <ListItemText className="tabTitle">
            <h3>Manage</h3>
          </ListItemText>

          <CustomMenuItem>
            <ListItemText>
              <p>Posts & Activity</p>
            </ListItemText>
          </CustomMenuItem>
          <CustomMenuItem>
            <ListItemText>
              <p>Job Posting Account</p>
            </ListItemText>
          </CustomMenuItem>
        </div>
        <div className="menu__tab">
          <CustomMenuItem>
            <ListItemText>
              <p onClick={logoutOfApp}>Sign Out</p>
            </ListItemText>
          </CustomMenuItem>
        </div>
      </CustomMenu>
    </div>
  );
};

export default StyledMenu;
