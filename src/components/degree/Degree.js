import { EditOutlined } from "@material-ui/icons";
import React, { forwardRef, useState } from "react";
import "./degree.css";

const Degree = forwardRef(
  ({ universityLogo, university, degree, start, end }, ref) => {
    const [shown, setShown] = useState(false);
    return (
      <div
        ref={ref}
        className="degree"
        onMouseEnter={() => setShown(true)}
        onMouseLeave={() => setShown(false)}
      >
        <img src={universityLogo} alt={university} />
        {shown && <EditOutlined />}
        <div className="degree__text">
          <h4>{university}</h4>
          <p>{degree}</p>
          <span>{`${start} - ${end}`}</span>
        </div>
      </div>
    );
  }
);

export default Degree;
