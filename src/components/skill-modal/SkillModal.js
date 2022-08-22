import { Close } from "@mui/icons-material";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { newSkill } from "../../services/modals.service";
import "./skillModal.css";

function SkillModal({ closeModal }) {
  const user = useSelector(selectUser);
  const { register, handleSubmit } = useForm();

  const uploadSkill = async (data) => {
    const { skill } = data;
    await newSkill({ userId: user.uid, skill });
    closeModal();
  };

  return (
    <div className="skillModal">
      <div className="skillModal__header">
        <h2>Add new skill </h2>
        <Close onClick={() => closeModal()} />
      </div>
      <form onSubmit={handleSubmit(uploadSkill)}>
        <label htmlFor="skill">
          Skill
          <input {...register("skill")} type="text" />
        </label>
        <button type="submit">Add Skill</button>
      </form>
    </div>
  );
}

export default SkillModal;
