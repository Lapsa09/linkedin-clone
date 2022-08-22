import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FlipMove from "react-flip-move";
import { Modal } from "@mui/material";
import { SkillModal, Ability } from "..";
import { selectUser } from "../../redux/userSlice";
import { getSkills } from "../../services";
import "./profileSkills.css";

function ProfileSkills() {
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    Promise.resolve(getSkills(user.uid)).then((skills) => setSkills(skills));
  }, []);

  return (
    <div className="profileSkills">
      <div className="skills__title">
        <h2>Skills</h2>
        <Add onClick={() => setOpen(true)} />
      </div>
      <FlipMove>
        {skills.map(({ id, data: { skill } }) => (
          <Ability key={id} id={id} skill={skill} />
        ))}
      </FlipMove>
      <Modal open={open} onClose={() => setOpen(false)}>
        <SkillModal />
      </Modal>
    </div>
  );
}

export default ProfileSkills;
