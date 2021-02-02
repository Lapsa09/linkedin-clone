import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "./educModal.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, getDegreeToEdit } from "../../features/educModalSlice";
import { db, getUserId } from "../../firebase";
import { selectUser } from "../../features/userSlice";

function EducModal() {
  const dispatch = useDispatch();

  const title = useSelector(getDegreeToEdit);
  const {
    universityLogo,
    university,
    degree,
    start,
    end,
    existing,
    id,
  } = title;

  const [univLogo, setUnivLogo] = useState(
    universityLogo ? universityLogo : ""
  );
  const [univ, setUniv] = useState(university ? university : "");
  const [deg, setDeg] = useState(degree ? degree : "");
  const [years, setYears] = useState(
    start && end ? [start, end] : [new Date(), new Date()]
  );

  const user = useSelector(selectUser);

  const handleYear = (e) => {
    if (e) {
      const range = e.map((year) => parseInt(year.toString().split(" ")[3]));
      setYears(range);
    } else {
      setYears([]);
    }
  };

  const upload = async (e) => {
    e.preventDefault();
    const userId = await getUserId(user.email);
    db.collection("users").doc(userId).collection("education").add({
      universityLogo: univLogo,
      university: univ,
      degree: deg,
      start: years[0],
      end: years[1],
    });
    dispatch(closeModal());
  };

  const edit = async (e) => {
    e.preventDefault();

    const userId = await getUserId(user.email);
    db.collection("users").doc(userId).collection("education").doc(id).update({
      universityLogo: univLogo,
      university: univ,
      degree: deg,
      start: years[0],
      end: years[1],
    });

    dispatch(closeModal());
  };

  return (
    <div className="educationModal-background">
      <div className="educationModal">
        <div className="modal__header">
          <h3>Add Educacion</h3>
          <Close onClick={() => dispatch(closeModal())} />
        </div>
        <img src={univLogo} alt="" />
        <form>
          <label htmlFor="">
            University Logo
            <input
              value={univLogo}
              onChange={(e) => setUnivLogo(e.target.value)}
              type="text"
            />
          </label>
          <label htmlFor="">
            University*
            <input
              value={univ}
              onChange={(e) => setUniv(e.target.value)}
              type="text"
            />
          </label>
          <label htmlFor="">
            Degree*
            <input
              value={deg}
              onChange={(e) => setDeg(e.target.value)}
              type="text"
            />
          </label>
          <label className="date">
            Start - End
            <DateRangePicker
              value={years.map((year) => (year + 1).toString())}
              onChange={handleYear}
              format="y"
              maxDetail="decade"
              required={true}
            />
          </label>
          <button onClick={existing ? edit : upload} type="submit">
            {existing ? "Edit Degree" : "Add Education"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EducModal;
