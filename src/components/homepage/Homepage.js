import React from "react";
import Feed from "../feed/Feed";
import Sidebar from "../sidebar/Sidebar";
import Widgets from "../widgets/Widgets";
import "./homepage.css";

function Homepage() {
  return (
    <div className="homepage">
      <div className="app__body">
        <Sidebar />
        <Feed />
        <Widgets />
      </div>
    </div>
  );
}

export default Homepage;
