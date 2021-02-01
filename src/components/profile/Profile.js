import React from "react";
import Follows from "../follows/Follows";
import ProfileEdu from "../profile-edu/ProfileEdu";
import ProfileInfo from "../profile-info/ProfileInfo";
import ProfileSkills from "../profile-skills/ProfileSkills";
import "./profile.css";

function Profile() {
  return (
    <div className="profile">
      <div className="profile__center">
        <ProfileInfo />
        <ProfileEdu />
        <ProfileSkills />
      </div>
      <div className="profile__right">
        <Follows one={true} />
        <Follows one={false} />
      </div>
    </div>
  );
}

export default Profile;
