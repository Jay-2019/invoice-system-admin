import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../../config";
import { Loader } from "../index";
import { backFeeDueDateDocumentId, adminAuthToken } from "../../constant";

export default function BackFeeDueDate(props) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
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
          `${API}/updateBackFeeDueDate/${backFeeDueDateDocumentId}/${adminAuthToken}`,
          values
        )
          .then(response => {
            if (response.status === 200 && !!response.data) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Back-Fee Due-Date Update Successfully :)",
                showConfirmButton: true,
                timer: 5000
              });
              setLoading(false);
              return;
            }

            if (response.status === 200 && !response.data) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed!!! Please Try Again.",
                showConfirmButton: true,
                timer: 5000
              });
              setLoading(false);
              return;
            }

            Swal.fire({
              position: "center",
              icon: "error",
              title: "Something Went Wrong!!! Please Try After Sometime.",
              showConfirmButton: true,
              timer: 5000
            });
            return setLoading(false);
          })
          .catch(error => {
            console.log(error.message);
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Something Went Wrong!!! Please Try After Sometime.",
              showConfirmButton: true,
              timer: 5000
            });
            return setLoading(false);
          });

        setSubmitting(false);
        setLoading(true);
        resetForm();
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
                    minDate={new Date()}
                    dateFormat="d MMMM, yyyy"
                    className="form-control"
                    name="firstSemester"
                    onChange={date => setFieldValue("firstSemester", date)}
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
                    minDate={new Date()}
                    dateFormat="d MMMM, yyyy"
                    className="form-control"
                    name="thirdSemester"
                    onChange={date => setFieldValue("thirdSemester", date)}
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
                    minDate={new Date()}
                    dateFormat="d MMMM, yyyy"
                    className="form-control"
                    name="fifthSemester"
                    onChange={date => setFieldValue("fifthSemester", date)}
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
                    minDate={new Date()}
                    dateFormat="d MMMM, yyyy"
                    className="form-control"
                    name="seventhSemester"
                    onChange={date => setFieldValue("seventhSemester", date)}
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
                    minDate={new Date()}
                    dateFormat="d MMMM, yyyy"
                    className="form-control"
                    name="secondSemester"
                    onChange={date => setFieldValue("secondSemester", date)}
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
                    minDate={new Date()}
                    dateFormat="d MMMM, yyyy"
                    className="form-control"
                    name="fourthSemester"
                    onChange={date => setFieldValue("fourthSemester", date)}
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
                    minDate={new Date()}
                    dateFormat="d MMMM, yyyy"
                    className="form-control"
                    name="sixthSemester"
                    onChange={date => setFieldValue("sixthSemester", date)}
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
                    minDate={new Date()}
                    dateFormat="d MMMM, yyyy"
                    className="form-control"
                    name="eighthSemester"
                    onChange={date => setFieldValue("eighthSemester", date)}
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
        </Form>
      )}
    </Formik>
  );
}
