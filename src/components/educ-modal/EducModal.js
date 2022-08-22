import { Close } from "@mui/icons-material";
import React, { useEffect } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { closeModal, getDegreeToEdit } from "../../redux/educModalSlice";
import { selectUser } from "../../redux/userSlice";
import { editDegree, newDegree } from "../../services/modals.service";
import "./educModal.css";

function EducModal() {
  const dispatch = useDispatch();
  const { register, handleSubmit, control, setValue, watch } = useForm({
    defaultValues: { years: [new Date(), new Date()] },
  });
  const title = useSelector(getDegreeToEdit);
  const user = useSelector(selectUser);
  const univLogo = watch("univLogo");

  useEffect(() => {
    if (title) {
      const { universityLogo, university, degree, start, end } = title;
      setValue("univLogo", universityLogo);
      setValue("univ", university);
      setValue("degree", degree);
      setValue("years", [start, end]);
    }
  }, []);

  const handleYear = (e) => (field) => {
    if (e) {
      const range = e.map((year) => parseInt(year.toString().split(" ")[3]));
      field.onChange(range);
    } else {
      field.onChange([]);
    }
  };

  const upload = async (data) => {
    await newDegree({ ...data, uid: user.uid });
    dispatch(closeModal());
  };

  const edit = async (data) => {
    await editDegree({ ...data, id: title.id, uid: user.id });
    dispatch(closeModal());
  };

  return (
    <div className="educationModal">
      <div className="modal__header">
        <h3>Add Educacion</h3>
        <Close onClick={() => dispatch(closeModal())} />
      </div>
      <img src={univLogo} alt="" />
      <form onSubmit={handleSubmit(title ? edit : upload)}>
        <label htmlFor="univLogo">
          University Logo
          <input {...register("univLogo")} />
        </label>
        <label htmlFor="univ">
          University*
          <input {...register("univ")} />
        </label>
        <label htmlFor="deg">
          Degree*
          <input {...register("deg")} />
        </label>
        {
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label htmlFor="years" className="date">
            Start - End
            <Controller
              name="years"
              control={control}
              render={({ field }) => (
                <DateRangePicker
                  {...field}
                  onChange={handleYear(field)}
                  format="y"
                  maxDetail="decade"
                  required
                />
              )}
            />
          </label>
        }
        <button type="submit">{title ? "Edit Degree" : "Add Education"}</button>
      </form>
    </div>
  );
}

export default EducModal;
