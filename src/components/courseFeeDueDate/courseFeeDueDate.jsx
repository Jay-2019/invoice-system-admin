import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
// import { year } from "../../constant";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CourseFeeDueDate(props) {
  // const [dueDate, setDueDate] = useState({
  //   firstYear: "",
  //   secondYear: "",
  //   thirdYear: "",
  //   fourthYear: ""
  // });

  // useEffect(() => {
  //   Axios.get(
  //     "http://localhost:4000/feePaymentDB/getCourseFeeDueDate/" +
  //       "5ebe659d096ddc0390a8e8ae"
  //   )
  //     .then(response => {
  //       return setDueDate({
  //         firstYear: new Date(response.data.firstYear).toLocaleDateString(
  //           "en-GB"
  //         ),
  //         secondYear: response.data.secondYear,
  //         thirdYear: response.data.thirdYear,
  //         fourthYear: response.data.fourthYear
  //       });
  //     })
  //     .catch(error => console.log(error.message));
  // }, []);
  // console.log(new Date(dueDate.firstYear).toLocaleDateString("en-GB"));
  return (
    <Formik
      initialValues={{
        firstYear: new Date(),
        secondYear: new Date(),
        thirdYear: new Date(),
        fourthYear: new Date()
      }}
      validationSchema={Yup.object({
        firstYear: Yup.date().required("Required"),
        secondYear: Yup.date().required("Required"),
        thirdYear: Yup.date().required("Required"),
        fourthYear: Yup.date().required("Required")
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        Axios.post(
          "http://localhost:4000/feePaymentDB/updateCourseFeeDueDate/" +
            "5ebe659d096ddc0390a8e8ae",
          values
        )
          .then(response => {
            return response.data;
          })
          .catch(error => error.message);

        setSubmitting(true);
        resetForm();
        // props.history.push("/studentSignIn");
      }}
    >
      {({
        values,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
      }) => (
        <Form>
          <br />
          <div className="d-flex justify-content-center">
            <div className="card text-white bg-dark w-75 ">
              <div className="card-header  text-center">
                <h2> Update Course Fee Due Dates</h2>
              </div>
              <div className="card-body">
                <div>
                  <div className="row">
                    <div className="col">
                      <b>First Year</b>
                    </div>
                    <div className="col">
                      <DatePicker
                        selected={values.firstYear}
                        dateFormat="d MMMM, yyyy"
                        className="form-control"
                        name="firstYear"
                        onChange={date => setFieldValue("firstYear", date)}
                      />
                      <ErrorMessage name="firstYear" />
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col">
                      <b>Second Year</b>
                      <ErrorMessage name="secondYear" />
                    </div>
                    <div className="col">
                      <DatePicker
                        selected={values.secondYear}
                        dateFormat="d MMMM, yyyy"
                        className="form-control"
                        name="secondYear"
                        onChange={date => setFieldValue("secondYear", date)}
                      />
                      <ErrorMessage name="secondYear" />
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col">
                      <b>Third Year</b>
                    </div>
                    <div className="col">
                      <DatePicker
                        selected={values.thirdYear}
                        dateFormat="d MMMM, yyyy"
                        className="form-control"
                        name="thirdYear"
                        onChange={date => setFieldValue("thirdYear", date)}
                      />
                      <ErrorMessage name="thirdYear" />
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col">
                      <b>Fourth Year</b>
                      <ErrorMessage name="fourthYear" />
                    </div>
                    <div className="col">
                      <DatePicker
                        selected={values.fourthYear}
                        dateFormat="d MMMM, yyyy"
                        className="form-control"
                        name="fourthYear"
                        onChange={date => setFieldValue("fourthYear", date)}
                      />
                      <ErrorMessage name="fourthYear" />
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col text-center">
                      <button
                        type="submit"
                        className="btn btn-outline-success"
                        disabled={isSubmitting}
                      >
                        Update Due Dates
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-center">
                Faculty of engineering & technology
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
