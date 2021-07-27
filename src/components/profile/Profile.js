import React from "react";
import { useSelector } from "react-redux";
import { getWidth } from "../../features/widthSlice";
import Follows from "../follows/Follows";
import ProfileEdu from "../profile-edu/ProfileEdu";
import ProfileInfo from "../profile-info/ProfileInfo";
import ProfileSkills from "../profile-skills/ProfileSkills";
import "./profile.css";

function Profile() {
  const width = useSelector(getWidth);
  return (
    <div className="profile">
      <div className="profile__center">
        <ProfileInfo />
        <ProfileEdu />
        <ProfileSkills />
      </div>
      {width > 612 && (
        <div className="profile__right">
          <Follows one={true} />
          <Follows one={false} />
        </div>
      )}
    </div>
  );
}

export default Profile;
