import React from "react";
import Feed from "../feed/Feed";
import Sidebar from "../sidebar/Sidebar";
import Widgets from "../widgets/Widgets";
import "./homepage.css";
import { useSelector } from "react-redux";
import { getWidth } from "../../features/widthSlice";

function Homepage() {
  const width = useSelector(getWidth);

  return (
    <div className="homepage">
      <Sidebar />
      <Feed />
      {width > 900 && <Widgets />}
    </div>
  );
}

export default Homepage;
