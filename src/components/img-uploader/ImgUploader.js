import { Image } from "@mui/icons-material";
import React, { useRef } from "react";
import { useController } from "react-hook-form";
import { useDispatch } from "react-redux";
import { InputOption } from "../";
import { updateUser } from "../../redux/userSlice";
import { changeProfilePic, uploadImg } from "../../services";

function ImgUploader({ control, name, uid, setValue, profile = false }) {
  const hiddenFileInput = useRef(null);
  const dispatch = useDispatch();
  const { field } = useController({ name, control });
  const openClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileUpload = async (e) => {
    const { name, link } = await uploadImg(uid, e);
    setValue("fileName", name);
    field.onChange(link);
  };

  const handleImg = async (e) => {
    const link = await changeProfilePic(uid, e);
    dispatch(
      updateUser({
        photoURL: link,
      })
    );
  };

  return (
    <>
      <InputOption
        onClick={openClick}
        Icon={Image}
        title="Photo"
        color="#70b5f9"
      />
      <input
        ref={hiddenFileInput}
        type="file"
        {...field}
        onChange={!profile ? handleFileUpload : handleImg}
      />
    </>
  );
}

export default ImgUploader;
