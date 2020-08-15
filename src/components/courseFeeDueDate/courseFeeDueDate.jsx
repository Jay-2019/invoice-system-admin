import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../../config";
import { arrayOfCaste, adminAuthToken } from "../../constant";
import { mapCasteWithDocumentId } from "./index";
import { Loader } from "../index";

export default function CourseFeeDueDate(props) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Formik
      initialValues={{
        caste: "",
        firstYear: new Date(),
        secondYear: new Date(),
        thirdYear: new Date(),
        fourthYear: new Date()
      }}
      validationSchema={Yup.object({
        caste: Yup.string()
          .oneOf(arrayOfCaste)
          .required("Select Due Dates For"),
        firstYear: Yup.date().required("Required"),
        secondYear: Yup.date().required("Required"),
        thirdYear: Yup.date().required("Required"),
        fourthYear: Yup.date().required("Required")
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const documentId = mapCasteWithDocumentId(values.caste);

        Axios.post(
          `${API}/updateCourseFeeDueDate/${documentId}/${adminAuthToken}`,
          values
        )
          .then(response => {
            if (response.status === 200 && !!response.data) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Course-Fee Due-Date Successfully Updated :)",
                showConfirmButton: true,
                timer: 5000
              });
              setLoading(false);
              return;
            }

            if (response.status === 200 && !response.data) {
              Swal.fire({
                position: "center",
                icon: "warning",
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

        setSubmitting(true);
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
          <div className="card-header border-secondary text-success text-center">
            <i>
              <h2>{"Update Course Fee Due Dates"}</h2>
            </i>
          </div>
          <div className="card-body  text-center">
            {/* Select Caste */}
            <div className="row">
              <div className="col-sm-12 col-md-6 ">
                <b>Due-Dates For</b>
              </div>
              <div className="col-sm-12 col-md-6 ">
                <Field as="select" name="caste" className="custom-select">
                  <option hidden>Select Caste..</option>
                  {arrayOfCaste.map((caste, index) => (
                    <option key={index} value={caste}>
                      {caste}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="caste"
                  render={msg => (
                    <div className="alert alert-primary" role="alert">
                      {msg}
                    </div>
                  )}
                />
              </div>
            </div>
            <hr />

            {/* First Year */}
            <div className="row">
              <div className="col-sm-12 col-md-6 ">
                <b>First Year</b>
              </div>
              <div className="col-sm-12 col-md-6 ">
                <DatePicker
                  selected={values.firstYear}
                  minDate={new Date()}
                  dateFormat="d MMMM, yyyy"
                  className="form-control"
                  name="firstYear"
                  onChange={date => setFieldValue("firstYear", date)}
                />
                <ErrorMessage name="firstYear" />
              </div>
            </div>
            <hr />

            {/* Second Year */}
            <div className="row">
              <div className="col-sm-12 col-md-6 ">
                <b>Second Year</b>
                <ErrorMessage name="secondYear" />
              </div>
              <div className="col-sm-12 col-md-6 ">
                <DatePicker
                  selected={values.secondYear}
                  minDate={new Date()}
                  dateFormat="d MMMM, yyyy"
                  className="form-control"
                  name="secondYear"
                  onChange={date => setFieldValue("secondYear", date)}
                />
                <ErrorMessage name="secondYear" />
              </div>
            </div>
            <hr />

            {/* Third Year */}
            <div className="row">
              <div className="col-sm-12 col-md-6 ">
                <b>Third Year</b>
              </div>
              <div className="col-sm-12 col-md-6 ">
                <DatePicker
                  selected={values.thirdYear}
                  minDate={new Date()}
                  dateFormat="d MMMM, yyyy"
                  className="form-control"
                  name="thirdYear"
                  onChange={date => setFieldValue("thirdYear", date)}
                />
                <ErrorMessage name="thirdYear" />
              </div>
            </div>
            <hr />

            {/* Fourth Year */}
            <div className="row">
              <div className="col-sm-12 col-md-6 ">
                <b>Fourth Year</b>
                <ErrorMessage name="fourthYear" />
              </div>
              <div className="col-sm-12 col-md-6 ">
                <DatePicker
                  selected={values.fourthYear}
                  minDate={new Date()}
                  dateFormat="d MMMM, yyyy"
                  className="form-control"
                  name="fourthYear"
                  onChange={date => setFieldValue("fourthYear", date)}
                />
                <ErrorMessage name="fourthYear" />
              </div>
            </div>
            <hr />

            {/* Submit Button */}
            <div className="row">
              <div className="col ">
                <button
                  type="submit"
                  className="btn btn-outline-success btn-block"
                  disabled={isSubmitting}
                >
                  <i>
                    <b> {"Update Due Dates"}</b>
                  </i>
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
