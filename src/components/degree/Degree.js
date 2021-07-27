import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import React, { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal, selectDegree } from "../../features/educModalSlice";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebase";
import "./degree.css";

const Degree = forwardRef(
  ({ id, universityLogo, university, degree, start, end }, ref) => {
    const [shown, setShown] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const openModalForEdit = () => {
      dispatch(
        selectDegree({
          universityLogo,
          university,
          degree,
          start,
          end,
          id,
        })
      );

      dispatch(openModal());
    };

    const deleteDegree = (e) => {
      e.preventDefault();

      db.collection("users")
        .doc(user.uid)
        .collection("education")
        .doc(id)
        .delete();
    };
    return (
      <div
        ref={ref}
        className="degree"
        onMouseEnter={() => setShown(true)}
        onMouseLeave={() => setShown(false)}
      >
        <img src={universityLogo} />
        {shown && (
          <div className="deg__buttons">
            <EditOutlined onClick={openModalForEdit} />
            <DeleteOutlined onClick={deleteDegree} />
          </div>
        )}
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
