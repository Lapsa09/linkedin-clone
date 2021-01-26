import { Add } from "@material-ui/icons";
import React from "react";
import Degree from "../degree/Degree";
import "./profileEdu.css";

function ProfileEdu() {
  return (
    <div className="profileEdu">
      <div className="profileEdu__title">
        <h2>Education</h2>
        <Add />
      </div>
      <div className="profileEdu__studies">
        <Degree />
        <Degree />
        <Degree />
        <Degree />
      </div>
    </div>
  );
}

export default ProfileEdu;
