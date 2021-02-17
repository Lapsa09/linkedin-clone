import { Avatar } from "@material-ui/core";
import {
  ChatOutlined,
  SendOutlined,
  ShareOutlined,
  ThumbUpOutlined,
} from "@material-ui/icons";
import React, { forwardRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebase";
import Comment from "../comment/Comment";
import InputOption from "../input-option/InputOption";
import firebase from "firebase";
import "./post.css";

const Post = forwardRef(
  ({ id, name, description, inputPhoto, message, photoUrl, liked }, ref) => {
    const user = useSelector(selectUser);
    const [commentBar, setCommentBar] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState([]);
    const [limit, setLimit] = useState(3);
    const [moreOrLess, setMoreOrLess] = useState(true);
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
      db.collection("posts")
        .doc(id)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }, []);

    const likeUnlike = () => {
      db.collection("posts").doc(id).update({ liked: !liked });
    };

    const sendComment = (e) => {
      e.preventDefault();

      db.collection("posts").doc(id).collection("comments").add({
        name: user.name,
        lastName: user.lastName,
        description: user.description,
        photoURL: user.photoURL,
        userId: user.uid,
        message: commentInput,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setCommentInput("");
      setCommentBar(false);
    };

    const showMore = () => {
      setLimit(limit + 5);
      if (limit <= comments.length) setMoreOrLess(false);
    };

    const showLess = () => {
      setMoreOrLess(true);
      setLimit(3);
    };

    return (
      <div ref={ref} className="post">
        <div className="post__header">
          <Avatar src={photoUrl}>{user.email[0].toUpperCase()}</Avatar>
          <div className="post__info">
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
        </div>

        <div className="post__body">
          <p>{message}</p>
          {inputPhoto && <img src={inputPhoto} />}
        </div>

        <div className="post__stats">
          <p className="likes">140 likes</p>·
          <p
            onClick={() => setShowComments(!showComments)}
            className="comments"
          >
            {comments.length} comments
          </p>
        </div>

        <div className="post__buttons">
          <InputOption
            Icon={ThumbUpOutlined}
            onClick={likeUnlike}
            title={liked ? "Liked" : "Like"}
            color={liked ? "aqua" : "gray"}
          />
          <InputOption
            onClick={() => setCommentBar(!commentBar)}
            Icon={ChatOutlined}
            title="Comment"
            color="gray"
          />
          <InputOption Icon={ShareOutlined} title="Share" color="gray" />
          <InputOption Icon={SendOutlined} title="Send" color="gray" />
        </div>
        {commentBar && (
          <div className="commentBar">
            <Avatar src={photoUrl}>{user.email[0].toUpperCase()}</Avatar>
            <form>
              <input
                type="text"
                placeholder="Comment"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <button onClick={sendComment} type="submit">
                Send
              </button>
            </form>
          </div>
        )}
        {showComments &&
          comments
            .slice(0, limit)
            .map(
              ({
                id,
                data: {
                  name,
                  lastName,
                  description,
                  photoURL,
                  message,
                  timestamp,
                  userId,
                },
              }) => (
                <Comment
                  key={id}
                  name={`${name} ${lastName}`}
                  description={description}
                  photoURL={photoURL}
                  message={message}
                  timestamp={timestamp}
                  userId={userId}
                />
              )
            )}

        {showComments &&
          (moreOrLess ? (
            <p className="showButton" onClick={showMore}>
              Load More
            </p>
          ) : (
            <p className="showButton" onClick={showLess}>
              Load Less
            </p>
          ))}
      </div>
    );
  }
);

export default Post;
