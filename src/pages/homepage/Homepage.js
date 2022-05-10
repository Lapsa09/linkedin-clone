import React from "react";
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import Widgets from "../../components/widgets/Widgets";
import { useWindowSize } from "../../hooks/useWindowSize";
import "./homepage.css";

function Homepage() {
  const { width } = useWindowSize();

  return (
    <div className="homepage">
      <Sidebar />
      <Feed />
      {width > 900 && <Widgets />}
    </div>
  );
}

export default Homepage;
