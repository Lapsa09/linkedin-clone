import { Close } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUser } from "../../redux/userSlice";
import { getUserData, updateUserData } from "../../services";
import "./profModal.css";

function ProfModal({ closeModal }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    Promise.resolve(getUserData(user.uid)).then(
      ({ name, lastName, description }) => {
        setValue("firstName", name);
        setValue("lastName", lastName);
        setValue("description", description);
      }
    );
  }, []);

  const updateProfile = async (data) => {
    const { firstName, lastName, description } = data;
    await updateUserData({ firstName, lastName, description, uid: user.uid });
    dispatch(updateUser({ firstName, lastName, description }));
    closeModal();
  };

  return (
    <div className="profModal">
      <div className="modal__header">
        <h2>Add new skill </h2>
        <Close onClick={() => closeModal()} />
      </div>
      <form onSubmit={handleSubmit(updateProfile)}>
        <label htmlFor="firstName">
          First Name:
          <input {...register("firstName")} type="text" />
        </label>
        <label htmlFor="lastName">
          Last Name:
          <input {...register("lastName")} type="text" />
        </label>
        <label htmlFor="description">
          Description:
          <input {...register("description")} type="text" />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default ProfModal;
