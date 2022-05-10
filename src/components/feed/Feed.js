import {
  CalendarViewDay,
  Close,
  Create,
  EventNote,
  Subscriptions,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { InputOption, Post } from "../index";
import { store } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { createPost, getPosts } from "../../services";
import FlipMove from "react-flip-move";
import { useForm } from "react-hook-form";
import ImgUploader from "../img-uploader/ImgUploader";
import "./feed.css";

function Feed() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const { handleSubmit, reset, register, control, watch } = useForm();
  const [inputPhoto, fileName] = watch(["inputPhoto", "fileName"]);

  useEffect(() => {
    const loadPosts = async () => {
      const posts = await Promise.resolve(getPosts());
      setPosts(posts);
    };
    loadPosts();
  }, []);

  const sendPost = async (data) => {
    await createPost({ ...user, ...data });
    reset();
  };

  const handleFileDelete = async () => {
    const storageRef = store.ref();
    const fileRef = storageRef.child(`postPics/${user.uid}/${fileName}`);
    await fileRef.delete();
    reset({ inputPhoto: "", fileName: "" });
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <img src={inputPhoto} alt="" />
        {inputPhoto && (
          <Close className="img__delete" onClick={handleFileDelete} />
        )}
        <div className="feed__input">
          <Create />
          <form onSubmit={handleSubmit(sendPost)}>
            <input {...register("input")} />
            <button type="submit">Send</button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <ImgUploader control={control} name="inputPhoto" uid={user.uid} />
          <InputOption Icon={Subscriptions} title="Video" color="#e7a33e" />
          <InputOption Icon={EventNote} title="Event" color="#c0cbcd" />
          <InputOption
            Icon={CalendarViewDay}
            title="Write Article"
            color="#7fc15e"
          />
        </div>
      </div>
      <FlipMove>
        {posts.map(
          ({
            id,
            data: {
              name,
              lastName,
              description,
              liked,
              photoURL,
              inputPhoto,
              message,
            },
          }) => (
            <Post
              key={id}
              id={id}
              name={`${name} ${lastName}`}
              photoUrl={photoURL}
              inputPhoto={inputPhoto}
              description={description}
              liked={liked}
              message={message}
            />
          )
        )}
      </FlipMove>
    </div>
  );
}

export default Feed;
