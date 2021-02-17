import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./comment.css";

function Comment({ name, description, timestamp, message, photoURL }) {
  const [count, setCount] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

  return (
    <div className="comment">
      <Avatar src={photoURL}>{name[0].toUpperCase()}</Avatar>
      <div className="comment__text">
        <div className="title">
          <div className="comment__text__left">
            <strong>{name}</strong>
            <span>{description}</span>
          </div>
          <div className="comment__text__right">
            <span>{count && timeSince(timestamp.toDate())} ago</span>
          </div>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Comment;
