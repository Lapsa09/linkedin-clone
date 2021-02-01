import { Avatar } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import React from "react";
import "./follows.css";

function Follows({ one }) {
  const userToFollow = (name, img, deg, desc) => (
    <div className="follows__user">
      <Avatar src={img} className="user__avatar" />
      <div className="user__text">
        <h4>{name}</h4>
        <span>{deg}</span>
        <p>{desc}</p>
        <div className="addFollow">
          <PersonAdd />
        </div>
      </div>
    </div>
  );
  return (
    <div className="follows">
      <h3>{one ? "People also viewed" : "People you may know"}</h3>
      <div className="follows__users">
        {userToFollow("Agustin Di Nardo", "", "3rd", "Programador Trainee")}
        {userToFollow("Agustin Di Nardo", "", "3rd", "Programador Trainee")}
        {userToFollow("Agustin Di Nardo", "", "3rd", "Programador Trainee")}
        {userToFollow("Agustin Di Nardo", "", "3rd", "Programador Trainee")}
      </div>
    </div>
  );
}

export default Follows;
