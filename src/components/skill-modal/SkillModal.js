import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSkillModal } from "../../features/skillModalSlice";
import { selectUser } from "../../features/userSlice";
import { db, getUserId } from "../../firebase";
import "./skillModal.css";

function SkillModal() {
  const [skill, setSkill] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const uploadSkill = async (e) => {
    e.preventDefault();
    const userId = await getUserId(user.email);
    db.collection("users").doc(userId).collection("skills").add({
      skill,
    });
    dispatch(closeSkillModal());
  };

  return (
    <div className="skillModal-background">
      <div className="skillModal">
        <div className="skillModal__header">
          <h2>Add new skill </h2>
          <Close onClick={() => dispatch(closeSkillModal())} />
        </div>
        <form>
          <label htmlFor="">
            Skill
            <input
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              type="text"
            />
          </label>
          <button onClick={uploadSkill} type="submit">
            Add Skill
          </button>
        </form>
      </div>
    </div>
  );
}

export default SkillModal;
