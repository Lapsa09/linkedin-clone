import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSkillModalState,
  openSkillModal,
} from "../../features/skillModalSlice";
import { SkillModal, Ability } from "../";
import { selectUser } from "../../features/userSlice";
import FlipMove from "react-flip-move";
import { getSkills } from "../../services";
import "./profileSkills.css";

function ProfileSkills() {
  const dispatch = useDispatch();
  const modal = useSelector(getSkillModalState);
  const user = useSelector(selectUser);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    Promise.resolve(getSkills(user.uid)).then((skills) => setSkills(skills));
  }, []);

  return (
    <div className="profileSkills">
      <div className="skills__title">
        <h2>Skills</h2>
        <Add onClick={() => dispatch(openSkillModal())} />
      </div>
      <FlipMove>
        {skills.map(({ id, data: { skill } }) => (
          <Ability key={id} id={id} skill={skill} />
        ))}
      </FlipMove>
      {modal && <SkillModal />}
    </div>
  );
}

export default ProfileSkills;
