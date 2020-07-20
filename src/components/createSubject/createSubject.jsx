import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import { arrayOfSemester } from "../../constant";
import { useNavigationBar } from "../index";
import API from "../../config";

export default function CreateSubject(props) {
  const navigationBar = useNavigationBar();

  const [isLoading, setLoading] = useState(true);
  const [arrayOfBranch, setArrayOfBranch] = useState([]);
  const [history, setHistory] = useState({
    subject: "",
    branch: "",
    semester: ""
  });

  useEffect(() => {
    Axios.get(`${API}/getBranch`)
      .then(response => {
        if (response.status === 200 && response.data) {
          setArrayOfBranch(response.data);
          setLoading(false);
          return;
        }

        if (response.status === 200 && response.data === null) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Something Went Wrong!!! Please Try After Sometime.",
            showConfirmButton: true,
            timer: 5000
          });
          setLoading(false);
          return;
        }
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
        setLoading(false);
        return;
      });
  }, []);

  return isLoading ? (
    <div
      className="d-flex justify-content-center"
      style={{ paddingTop: "200px" }}
    >
      <div className="row">
        <div className="col ">
          <div className="spinner-grow text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div className="col    ">
          <div className="spinner-grow text-warning" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div className="col ">
          <div className="spinner-grow text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
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

        Axios.post(`${API}/createSubject/`, values)
          .then(response => {
            if (response.status === 200 && response.data) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Subject Successfully Created :)",
                showConfirmButton: true,
                timer: 5000
              });
              setLoading(false);
              return;
            }

            if (response.status === 200 && response.data === null) {
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
        setSubmitting(true);
        setLoading(true);
        resetForm();
      }}
    >
      <Form>
        {navigationBar}
        <hr />
        <div className="d-flex justify-content-center">
          <div className="col-sm-12 col-md-8">
            <div className="card text-white bg-dark border-light ">
              <div className="card-header text-success border-secondary text-center">
                <i>
                  <h2>Create Subject</h2>
                </i>
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
                      <Field
                        as="select"
                        name="branch"
                        className="custom-select"
                      >
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
              <div className="card-footer border-secondary text-center">
                Faculty of engineering & technology
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
