import { Avatar } from "@mui/material";
import {
  ChatOutlined,
  SendOutlined,
  ShareOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import React, { forwardRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { db } from "../../firebase";
import { Comment, InputOption } from "../";
import { useForm } from "react-hook-form";
import { getPostComments, newComment } from "../../services";
import "./post.css";

const Post = forwardRef(
  ({ id, name, description, inputPhoto, message, photoUrl, liked }, ref) => {
    const user = useSelector(selectUser);
    const [commentBar, setCommentBar] = useState(false);
    const [comments, setComments] = useState([]);
    const [limit, setLimit] = useState(3);
    const [moreOrLess, setMoreOrLess] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
      Promise.resolve(getPostComments()).then((comments) =>
        setComments(comments)
      );
    }, []);

    const likeUnlike = () => {
      db.collection("posts").doc(id).update({ liked: !liked });
    };

    const sendComment = async (data) => {
      await newComment({ ...data, ...user });
      reset();
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
            <form onSubmit={handleSubmit(sendComment)}>
              <input placeholder="Comment" {...register("commentInput")} />
              <button type="submit">Send</button>
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
