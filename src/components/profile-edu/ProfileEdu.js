import { Add } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Degree from "../degree/Degree";
import { getModalState, openModal } from "../../features/educModalSlice";
import EducModal from "../educ-modal/EducModal";
import "./profileEdu.css";
import { db, getUserId } from "../../firebase";
import { selectUser } from "../../features/userSlice";
import FlipMove from "react-flip-move";

function ProfileEdu() {
  const modal = useSelector(getModalState);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [grades, setGrades] = useState([]);

  useEffect(async () => {
    const userId = await getUserId(user.email);
    db.collection("users")
      .doc(userId)
      .collection("education")
      .orderBy("start", "desc")
      .onSnapshot((snapshot) => {
        setGrades(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
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
