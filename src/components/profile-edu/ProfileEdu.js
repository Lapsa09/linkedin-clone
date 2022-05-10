import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModalState, openModal } from "../../features/educModalSlice";
import { EducModal, Degree } from "../";
import { selectUser } from "../../features/userSlice";
import { getDegrees } from "../../services/profile.service";
import FlipMove from "react-flip-move";
import "./profileEdu.css";

function ProfileEdu() {
  const modal = useSelector(getModalState);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    Promise.resolve(getDegrees(user.uid)).then((degrees) => setGrades(degrees));
  }, []);

  return (
    <div className="profileEdu">
      <div className="profileEdu__title">
        <h2>Education</h2>
        <Add onClick={() => dispatch(openModal())} />
      </div>
      <div className="profileEdu__studies">
        <FlipMove>
          {grades.map(
            ({
              id,
              data: { universityLogo, university, degree, start, end },
            }) => (
              <Degree
                key={id}
                id={id}
                universityLogo={universityLogo}
                university={university}
                degree={degree}
                start={start}
                end={end}
              />
            )
          )}
        </FlipMove>
      </div>
      {modal && <EducModal />}
    </div>
  );
}

export default ProfileEdu;
