import { Image } from "@mui/icons-material";
import React, { useRef } from "react";
import { useController, useForm } from "react-hook-form";
import { InputOption } from "../";
import { store } from "../../firebase";

function ImgUploader({ control, name, uid }) {
  const hiddenFileInput = useRef(null);
  const openClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = store.ref();
    const fileRef = storageRef.child(`postPics/${uid}/${file.name}`);
    await fileRef.put(file);
    setValue("fileName", file.name);
    field.onChange(await fileRef.getDownloadURL());
  };
  const { field } = useController({ name, control });
  const { setValue } = useForm();

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
        onChange={handleFileUpload}
      />
    </>
  );
}

export default ImgUploader;
