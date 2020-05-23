import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { arrayOfBranch, arrayOfSemester } from "../../constant";

export default function CreateSubject(props) {
  return (
    <Formik
      initialValues={{
        subjectName: "",
        branch: "",
        semester: ""
      }}
      validationSchema={Yup.object({
        subjectName: Yup.string()
          .matches(
            /^[ A-Za-z0-9_./+-]*$/,
            " Subject Name Contain only AlphaNumeric & Special Character(_,.,/,+,-) "
          )
          .required("Required"),
        branch: Yup.string()
          .oneOf(arrayOfBranch)
          .required("Required"),
        semester: Yup.string()
          .oneOf(arrayOfSemester)
          .required("Required")
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        Axios.post(`http://localhost:4000/feePaymentDB/createSubject/`, values)
          .then(response => {
            return response.data;
          })
          .catch(error => error.message);

        setSubmitting(true);
        resetForm();
        // props.history.push("/studentSignIn");
      }}
    >
      <Form>
        <br />
        <div className="d-flex justify-content-center">
          <div className="card text-white bg-dark w-75 ">
            <div className="card-header  text-center">
              <h2>Course Fee Type</h2>
            </div>
            <div className="card-body">
              <div>
                <div className="row">
                  <div className="col">
                    <b>Subject Name</b>
                  </div>
                  <div className="col">
                    <Field
                      type="string"
                      name="subjectName"
                      placeholder="Subject "
                      className="form-control"
                    />
                    <ErrorMessage name="subjectName" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col">
                    <b>Branch</b>
                  </div>
                  <div className="col">
                    <Field as="select" name="branch" className="custom-select">
                      <option hidden>Select Branch...</option>
                      {arrayOfBranch.map((branch, index) => (
                        <option key={index} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="branch" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col">
                    <b>Semester</b>
                  </div>
                  <div className="col">
                    <Field
                      as="select"
                      name="semester"
                      className="custom-select"
                    >
                      <option hidden>Select Semester...</option>
                      {arrayOfSemester.map((semester, index) => (
                        <option key={index} value={semester}>
                          {semester}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="semester" />
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col text-center">
                    <button type="submit" className="btn btn-outline-success">
                      Create Subject
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
    </Formik>
  );
}
