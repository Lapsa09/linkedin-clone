import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
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
    const seconds = Math.floor((new Date() - date) / 1000);
    return DateTime.now().minus({ seconds }).toRelative();
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
