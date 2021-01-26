import React from "react";
import ProfileEdu from "../profile-edu/ProfileEdu";
import ProfileInfo from "../profile-info/ProfileInfo";
import "./profile.css";

function Profile() {
  return (
    <div className="profile">
      <div className="profile__center">
        <ProfileInfo />
        <ProfileEdu />
      </div>
    </div>
  );
}

export default Profile;
