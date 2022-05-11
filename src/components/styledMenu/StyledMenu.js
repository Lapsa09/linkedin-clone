import React, { useState } from "react";
import {
  Avatar,
  ListItem,
  Menu,
  MenuItem,
  ListItemAvatar,
  ListItemText,
  withStyles,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { HeaderOption } from "../";
import "./styledMenu.css";

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
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
  },
}))(MenuItem);

const StyledMenu = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useNavigate();

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

  const handleDirect = () => {
    history("/profile");
    handleClose();
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
        <div className="menu__profile">
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
        </div>
        <ListItem>
          <button onClick={handleDirect} className="profileButton">
            View Profile
          </button>
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
