import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
// import { year } from "../../constant";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../../config";
import { useNavigationBar } from "../index";
//DB -> courseFeeDueDate(collection) -> documentID
const documentId = "5ec0ec3d70f1cc05e0d9f6d8";

export default function CourseFeeDueDate(props) {
  const navigationBar = useNavigationBar();

  // const [dueDate, setDueDate] = useState({
  //   firstYear: "",
  //   secondYear: "",
  //   thirdYear: "",
  //   fourthYear: ""
  // });

  // useEffect(() => {
  //   Axios.get(`${API}/getCourseFeeDueDate/${documentId}`)
  //     .then(response => {
  //       return setDueDate({
  //         firstYear: new Date(response.data.firstYear).toLocaleDateString(
  //           "en-GB"
  //         ),
  //         secondYear: response.data.secondYear.toLocaleDateString(),
  //         thirdYear: response.data.thirdYear,
  //         fourthYear: response.data.fourthYear
  //       });
  //     })
  //     .catch(error => console.log(error.message));
  // }, []);

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
        Axios.post(`${API}/updateCourseFeeDueDate/${documentId}`, values)
          .then(response => {
            if (response.status === 200 && response.data) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Course-Fee Due-Date Successfully Updated :)",
                showConfirmButton: true,
                timer: 2000
              });
              resetForm();
              return;
            }

            if (response.status === 200 && response.data === null) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed!!! Please Try Again.",
                showConfirmButton: true,
                timer: 2000
              });
              resetForm();
              return;
            }

            return Swal.fire({
              position: "center",
              icon: "error",
              title: "Something Went Wrong!!! Please Try After Sometime.",
              showConfirmButton: true,
              timer: 2000
            });
          })
          .catch(error => error.message);

        setSubmitting(true);
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
          {navigationBar}
          <hr />

          <div className="d-flex justify-content-center">
            <div className="col-sm-12 col-md-8 ">
              <div className="card  border-light text-white bg-dark">
                <div className="card-header border-secondary text-success text-center">
                  <i>
                    {" "}
                    <h2> Update Course Fee Due Dates</h2>
                  </i>
                </div>
                <div className="card-body  text-center">
                  <div>
                    <div className="row">
                      <div className="col-sm-12 col-md-6 ">
                        <b>First Year</b>
                      </div>
                      <div className="col-sm-12 col-md-6 ">
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
                      <div className="col-sm-12 col-md-6 ">
                        <b>Second Year</b>
                        <ErrorMessage name="secondYear" />
                      </div>
                      <div className="col-sm-12 col-md-6 ">
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
                      <div className="col-sm-12 col-md-6 ">
                        <b>Third Year</b>
                      </div>
                      <div className="col-sm-12 col-md-6 ">
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
                      <div className="col-sm-12 col-md-6 ">
                        <b>Fourth Year</b>
                        <ErrorMessage name="fourthYear" />
                      </div>
                      <div className="col-sm-12 col-md-6 ">
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
                      <div className="col ">
                        <button
                          type="submit"
                          className="btn btn-outline-success btn-block"
                          disabled={isSubmitting}
                        >
                          <i>
                            {" "}
                            <b> Update Due Dates</b>
                          </i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer border-secondary text-center">
                  Faculty of engineering & technology
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
