import React, { useRef } from "react";
import Feed from "../feed/Feed";
import Sidebar from "../sidebar/Sidebar";
import Widgets from "../widgets/Widgets";
import { useResize } from "../../features/useResize";
import "./homepage.css";

function Homepage() {
  const initWidth = window.innerWidth;
  const myRef = useRef(null);

  const { width } = useResize(myRef, initWidth);
  return (
    <div ref={myRef} className="homepage">
      <Sidebar />
      <Feed />
      {width > 900 && <Widgets />}
    </div>
  );
}

export default Homepage;
