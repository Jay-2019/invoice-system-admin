import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../../config";
import { useNavigationBar } from "../index";
//DB -> backFeeDueDate(collection) -> documentID
const backFeeDueDateDocumentId = "5ec3822919bba72e54e8651d";

export default function BackFeeDueDate(props) {
  const navigationBar = useNavigationBar();

  return (
    <Formik
      initialValues={{
        firstSemester: new Date(),
        secondSemester: new Date(),
        thirdSemester: new Date(),
        fourthSemester: new Date(),
        fifthSemester: new Date(),
        sixthSemester: new Date(),
        seventhSemester: new Date(),
        eighthSemester: new Date()
      }}
      validationSchema={Yup.object({
        firstSemester: Yup.date().required("Required"),
        secondSemester: Yup.date().required("Required"),
        thirdSemester: Yup.date().required("Required"),
        fourthSemester: Yup.date().required("Required"),
        fifthSemester: Yup.date().required("Required"),
        sixthSemester: Yup.date().required("Required"),
        seventhSemester: Yup.date().required("Required"),
        eighthSemester: Yup.date().required("Required")
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        Axios.post(
          `${API}/updateBackFeeDueDate/${backFeeDueDateDocumentId}`,
          values
        )
          .then(response => {
            if (response.status === 200 && response.data) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Back-Fee Due-Date Update Successfully :)",
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

        setSubmitting(false);
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
            <div className="col-sm-12 col-md-8">
              <div className="card text-white border-light text-center bg-dark  ">
                <div className="card-header text-success border-secondary">
                  <i>
                    <h2> Update Back Fee Due Dates</h2>
                  </i>
                </div>
                <div className="card-body">
                  <div>
                    <div className="row">
                      <div className="col text-danger">
                        <b>
                          <i> Odd Semesters</i>
                        </b>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <b>First Semester</b>
                      </div>
                      <div className="col-sm-12 col-md-6 ">
                        <DatePicker
                          selected={values.firstSemester}
                          dateFormat="d MMMM, yyyy"
                          className="form-control"
                          name="firstSemester"
                          onChange={date =>
                            setFieldValue("firstSemester", date)
                          }
                        />
                        <ErrorMessage name="firstSemester" />
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <b>Third Semester</b>
                      </div>
                      <div className="col-sm-12 col-md-6 ">
                        <DatePicker
                          selected={values.thirdSemester}
                          dateFormat="d MMMM, yyyy"
                          className="form-control"
                          name="thirdSemester"
                          onChange={date =>
                            setFieldValue("thirdSemester", date)
                          }
                        />
                        <ErrorMessage name="thirdSemester" />
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <b>Fifth Semester</b>
                        <ErrorMessage name="fifthSemester" />
                      </div>
                      <div className="col-sm-12 col-md-6 ">
                        <DatePicker
                          selected={values.fifthSemester}
                          dateFormat="d MMMM, yyyy"
                          className="form-control"
                          name="fifthSemester"
                          onChange={date =>
                            setFieldValue("fifthSemester", date)
                          }
                        />
                        <ErrorMessage name="fifthSemester" />
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <b>Seventh Semester</b>
                        <ErrorMessage name="seventhSemester" />
                      </div>
                      <div className="col-sm-12 col-md-6 ">
                        <DatePicker
                          selected={values.seventhSemester}
                          dateFormat="d MMMM, yyyy"
                          className="form-control"
                          name="seventhSemester"
                          onChange={date =>
                            setFieldValue("seventhSemester", date)
                          }
                        />
                        <ErrorMessage name="seventhSemester" />
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col text-danger">
                        <b>
                          <i>Even Semesters</i>
                        </b>
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <b>Second Semester</b>
                        <ErrorMessage name="secondSemester" />
                      </div>
                      <div className="col-sm-12 col-md-6 ">
                        <DatePicker
                          selected={values.secondSemester}
                          dateFormat="d MMMM, yyyy"
                          className="form-control"
                          name="secondSemester"
                          onChange={date =>
                            setFieldValue("secondSemester", date)
                          }
                        />
                        <ErrorMessage name="secondSemester" />
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <b>Fourth Semester</b>
                        <ErrorMessage name="fourthSemester" />
                      </div>
                      <div className="col-sm-12 col-md-6 ">
                        <DatePicker
                          selected={values.fourthSemester}
                          dateFormat="d MMMM, yyyy"
                          className="form-control"
                          name="fourthSemester"
                          onChange={date =>
                            setFieldValue("fourthSemester", date)
                          }
                        />
                        <ErrorMessage name="fourthSemester" />
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <b>Sixth Semester</b>
                        <ErrorMessage name="sixthSemester" />
                      </div>
                      <div className="col-sm-12 col-md-6 ">
                        <DatePicker
                          selected={values.sixthSemester}
                          dateFormat="d MMMM, yyyy"
                          className="form-control"
                          name="sixthSemester"
                          onChange={date =>
                            setFieldValue("sixthSemester", date)
                          }
                        />
                        <ErrorMessage name="sixthSemester" />
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <b>Eighth Semester</b>
                        <ErrorMessage name="eighthSemester" />
                      </div>
                      <div className="col-sm-12 col-md-6 ">
                        <DatePicker
                          selected={values.eighthSemester}
                          dateFormat="d MMMM, yyyy"
                          className="form-control"
                          name="eighthSemester"
                          onChange={date =>
                            setFieldValue("eighthSemester", date)
                          }
                        />
                        <ErrorMessage name="eighthSemester" />
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col">
                        <button
                          type="submit"
                          className="btn btn-outline-success btn-block"
                          disabled={isSubmitting}
                        >
                          <i>
                            <b>Update Due Dates</b>
                          </i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer border-secondary">
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
