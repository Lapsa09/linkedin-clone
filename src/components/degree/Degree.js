import { EditOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import "./degree.css";

function Degree() {
  const [shown, setShown] = useState(false);
  return (
    <div
      className="degree"
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <img
        src="https://yt3.ggpht.com/ytc/AAUvwniC5dIJ3N885ZYQ2Pwkg2wx_bI6b4f5BkQ8JfGgyQ=s900-c-k-c0x00ffffff-no-rj"
        alt=""
      />
      {shown && <EditOutlined />}
      <div className="degree__text">
        <h4>Universidad Nacional De San Martin</h4>
        <p>TPI</p>
        <span>2017 - 2022</span>
      </div>
    </div>
  );
}

export default Degree;
