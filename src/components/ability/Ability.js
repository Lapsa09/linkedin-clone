import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import "./ability.css";

function Ability({ skill }) {
  const [showIcons, setShowIcons] = useState(false);
  return (
    <div
      className="ability"
      onMouseEnter={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
    >
      <h4>{skill}</h4>
      {showIcons && (
        <div className="ability__buttons">
          <EditOutlined />
          <DeleteOutlined />
        </div>
      )}
    </div>
  );
}

export default Ability;
