import {
  CalendarViewDay,
  Close,
  Create,
  EventNote,
  Image,
  Subscriptions,
} from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import InputOption from "../input-option/InputOption";
import Post from "../post/Post";
import { db, store } from "../../firebase";
import firebase from "firebase";
import "./feed.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import FlipMove from "react-flip-move";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [inputPhoto, setInputPhoto] = useState("");
  const [fileName, setFileName] = useState("");
  const user = useSelector(selectUser);
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const sendPost = async (e) => {
    e.preventDefault();

    db.collection("posts").add({
      name: user.name,
      lastName: user.lastName,
      description: user.description,
      photoURL: user.photoURL,
      inputPhoto,
      userId: user.uid,
      message: input,
      liked: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
    setInputPhoto("");
  };

  const openClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = store.ref();
    const fileRef = storageRef.child(`postPics/${user.uid}/${file.name}`);
    await fileRef.put(file);
    setInputPhoto(await fileRef.getDownloadURL());
    setFileName(file.name);
  };

  const handleFileDelete = () => {
    const storageRef = store.ref();
    const fileRef = storageRef.child(`postPics/${user.uid}/${fileName}`);

    fileRef.delete().then(() => {
      setFileName("");
      setInputPhoto("");
    });
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
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption
            onClick={openClick}
            Icon={Image}
            title="Photo"
            color="#70b5f9"
          />
          <input
            ref={hiddenFileInput}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
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
