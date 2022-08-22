import React from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import {
  Follows,
  ProfileEdu,
  ProfileInfo,
  ProfileSkills,
} from "../../components";
import "./profile.css";

function Profile() {
  const { width } = useWindowSize();
  return (
    <div className="profile">
      <div className="profile__center">
        <ProfileInfo />
        <ProfileEdu />
        <ProfileSkills />
      </div>
      {width > 612 && (
        <div className="profile__right">
          <Follows one />
          <Follows one={false} />
        </div>
      )}
    </div>
  );
}

export default Profile;
