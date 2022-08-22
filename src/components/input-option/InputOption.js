import React from "react";
import "./inputOption.css";

function InputOption({ Icon, title, color, onClick }) {
  return (
    <div onClick={onClick} className="input-option">
      <Icon style={{ color }} />
      <h4 style={{ color }}>{title}</h4>
    </div>
  );
}

export default InputOption;
