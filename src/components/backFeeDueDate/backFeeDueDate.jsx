import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigationBar } from "../index";

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
          "http://localhost:4000/feePaymentDB/updateBackFeeDueDate/" +
            "5ec3822919bba72e54e8651d",
          values
        )
          .then(response => {
            return window.alert("Back Fee DueDate Update Successfully");
          })
          .catch(error => error.message);

        setSubmitting(false);
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
          {navigationBar}
          <hr />
          <div className="d-flex justify-content-center">
            <div className="card text-white bg-dark w-75 ">
              <div className="card-header  text-center">
                <h2> Update Back Fee Due Dates</h2>
              </div>
              <div className="card-body">
                <div>
                  <div className="row text-center">
                    <div className="col text-center ">
                      <b>
                        <i> Odd Semesters</i>
                      </b>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12 col-md-6 text-center">
                      <b>First Semester</b>
                    </div>
                    <div className="col-sm-12 col-md-6 ">
                      <DatePicker
                        selected={values.firstSemester}
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
                    <div className="col-sm-12 col-md-6 text-center">
                      <b>Third Semester</b>
                    </div>
                    <div className="col-sm-12 col-md-6 ">
                      <DatePicker
                        selected={values.thirdSemester}
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
                    <div className="col-sm-12 col-md-6 text-center">
                      <b>Fifth Semester</b>
                      <ErrorMessage name="fifthSemester" />
                    </div>
                    <div className="col-sm-12 col-md-6 ">
                      <DatePicker
                        selected={values.fifthSemester}
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
                    <div className="col-sm-12 col-md-6 text-center">
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

                  <div className="row text-center">
                    <div className="col text-center ">
                      <b>
                        <i>Even Semesters</i>
                      </b>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-12 col-md-6 text-center">
                      <b>Second Semester</b>
                      <ErrorMessage name="secondSemester" />
                    </div>
                    <div className="col-sm-12 col-md-6 ">
                      <DatePicker
                        selected={values.secondSemester}
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
                    <div className="col-sm-12 col-md-6 text-center">
                      <b>Fourth Semester</b>
                      <ErrorMessage name="fourthSemester" />
                    </div>
                    <div className="col-sm-12 col-md-6 ">
                      <DatePicker
                        selected={values.fourthSemester}
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
                    <div className="col-sm-12 col-md-6 text-center">
                      <b>Sixth Semester</b>
                      <ErrorMessage name="sixthSemester" />
                    </div>
                    <div className="col-sm-12 col-md-6 ">
                      <DatePicker
                        selected={values.sixthSemester}
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
                    <div className="col-sm-12 col-md-6 text-center">
                      <b>Eighth Semester</b>
                      <ErrorMessage name="eighthSemester" />
                    </div>
                    <div className="col-sm-12 col-md-6 ">
                      <DatePicker
                        selected={values.eighthSemester}
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
                    <div className="col text-center">
                      <button
                        type="submit"
                        className="btn btn-outline-success btn-block"
                        disabled={isSubmitting}
                      >
                       <i> <b>Update Due Dates</b></i>
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
