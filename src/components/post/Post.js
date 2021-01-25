import { Avatar } from "@material-ui/core";
import {
  ChatOutlined,
  SendOutlined,
  ShareOutlined,
  ThumbUpOutlined,
} from "@material-ui/icons";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebase";
import InputOption from "../input-option/InputOption";
import "./post.css";

const Post = forwardRef(
  ({ id, name, description, message, photoUrl, liked }, ref) => {
    const user = useSelector(selectUser);

    const likeUnlike = () => {
      db.collection("posts").doc(id).update({ liked: !liked });
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
        </div>

        <div className="post__buttons">
          <InputOption
            Icon={ThumbUpOutlined}
            onClick={likeUnlike}
            title={liked ? "Liked" : "Like"}
            color={liked ? "aqua" : "gray"}
          />
          <InputOption Icon={ChatOutlined} title="Comment" color="gray" />
          <InputOption Icon={ShareOutlined} title="Share" color="gray" />
          <InputOption Icon={SendOutlined} title="Send" color="gray" />
        </div>
      </div>
    );
  }
);

export default Post;
