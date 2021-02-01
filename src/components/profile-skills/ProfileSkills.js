import { Add } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ability from "../ability/Ability";
import {
  getSkillModalState,
  openSkillModal,
} from "../../features/skillModalSlice";
import "./profileSkills.css";
import SkillModal from "../skill-modal/SkillModal";
import { db, getUserId } from "../../firebase";
import { selectUser } from "../../features/userSlice";
import FlipMove from "react-flip-move";

function ProfileSkills() {
  const dispatch = useDispatch();
  const modal = useSelector(getSkillModalState);
  const user = useSelector(selectUser);
  const [skills, setSkills] = useState([]);

  useEffect(async () => {
    const userId = await getUserId(user.email);
    db.collection("users")
      .doc(userId)
      .collection("skills")
      .onSnapshot((snapshot) => {
        setSkills(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
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
