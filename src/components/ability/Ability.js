import { DeleteOutlined } from "@mui/icons-material";
import React, { forwardRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebase";
import "./ability.css";

const Ability = forwardRef(({ skill, id }, ref) => {
  const [showIcons, setShowIcons] = useState(false);
  const user = useSelector(selectUser);

  const deleteSkill = async (e) => {
    e.preventDefault();

    await db
      .collection("users")
      .doc(user.uid)
      .collection("skills")
      .doc(id)
      .delete();
  };
  return (
    <div
      ref={ref}
      className="ability"
      onMouseEnter={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
    >
      <h4>{skill}</h4>
      {showIcons && (
        <div className="ability__buttons">
          <DeleteOutlined onClick={deleteSkill} />
        </div>
      )}
    </div>
  );
});

export default Ability;
