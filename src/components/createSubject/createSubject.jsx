import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { arrayOfSemester } from "../../constant";
import { useNavigationBar } from "../index";

export default function CreateSubject(props) {
  const navigationBar = useNavigationBar();

  const [arrayOfBranch, setArrayOfBranch] = useState([]);
  const [history, setHistory] = useState({
    subject: "",
    branch: "",
    semester: ""
  });

  useEffect(() => {
    Axios.get(`http://localhost:4000/feePaymentDB/getBranch`)
      .then(response => {
        setArrayOfBranch(response.data);
      })
      .catch(error => error.message);
  }, []);

  return (
    <Formik
      initialValues={{
        subjectName: history.subject,
        branch: history.branch,
        semester: history.semester
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
        
        setHistory({
          subject: "",
          branch: values.branch,
          semester: values.semester
        });

        Axios.post(`http://localhost:4000/feePaymentDB/createSubject/`, values)
          .then(response => {
            return response.data;
          })
          .catch(error => error.message);

        setSubmitting(true);
        resetForm();

        // props.history.push(`/createSubject/${localStorage.getItem("adminAuthToken")}`);
      }}
    >
      <Form>
        {navigationBar}
        <hr />
        <div className="d-flex justify-content-center">
          <div className="card text-white bg-dark w-75 ">
            <div className="card-header  text-center">
              <h2>Create Subject</h2>
            </div>
            <div className="card-body">
              <div>
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>Subject Name</b>
                  </div>
                  <div className="col-sm-12 col-md-6">
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
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>Branch</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
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
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>Semester</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
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
                    <button
                      type="submit"
                      className="btn btn-outline-success  btn-block"
                    >
                      <i>
                        {" "}
                        <b>{" Create Subject"}</b>
                      </i>
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
