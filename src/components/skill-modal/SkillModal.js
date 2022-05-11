import { Close } from "@mui/icons-material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeSkillModal } from "../../features/skillModalSlice";
import { selectUser } from "../../features/userSlice";
import { newSkill } from "../../services/modals.service";
import "./skillModal.css";

function SkillModal() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { register, handleSubmit } = useForm();

  const uploadSkill = async (data) => {
    const { skill } = data;
    await newSkill({ userId: user.uid, skill });
    dispatch(closeSkillModal());
  };

  return (
    <div className="skillModal-background">
      <div className="skillModal">
        <div className="skillModal__header">
          <h2>Add new skill </h2>
          <Close onClick={() => dispatch(closeSkillModal())} />
        </div>
        <form onSubmit={handleSubmit(uploadSkill)}>
          <label htmlFor="">
            Skill
            <input {...register("skill")} type="text" />
          </label>
          <button type="submit">Add Skill</button>
        </form>
      </div>
    </div>
  );
}

export default SkillModal;
