import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import { arrayOfSubjectType, arrayOfSemester } from "../../constant";
import API from "../../config";
import { Loader } from "../index";

export default function CreateSubject(props) {
  const [isLoading, setLoading] = useState(true);
  const [arrayOfBranch, setArrayOfBranch] = useState([]);
  const [history, setHistory] = useState({
    subjectName: "",
    subjectType: "",
    branch: "",
    semester: ""
  });

  useEffect(() => {
    let source = Axios.CancelToken.source();

    Axios.get(`${API}/getBranch`)
      .then(response => {
        if (response.status === 200 && !!response.data.length) {
          setArrayOfBranch(response.data);
          setLoading(false);
          return;
        }

        if (response.status === 200 && !response.data.length) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Branch Not Found!!!",
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

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Formik
      initialValues={{
        subjectName: history.subject,
        subjectType: history.subjectType,
        branch: history.branch,
        semester: history.semester
      }}
      validationSchema={Yup.object({
        subjectName: Yup.string()
          .matches(
            /^[ A-Za-z0-9_./+-]*$/,
            " Subject Name Contain only AlphaNumeric & Special Character(_,.,/,+,-) "
          )
          .required("Subject Name Required"),
        subjectType: Yup.string()
          .oneOf(arrayOfSubjectType)
          .required("Subject Type Required"),
        branch: Yup.string()
          .oneOf(arrayOfBranch)
          .required("Branch Required"),
        semester: Yup.string()
          .oneOf(arrayOfSemester)
          .required("Semester Required")
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setHistory({
          subjectName: "",
          subjectType: values.subjectType,
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
                <ErrorMessage
                  name="subjectName"
                  render={msg => (
                    <div className="alert alert-primary" role="alert">
                      {msg}
                    </div>
                  )}
                />
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-sm-12 col-md-6 text-center">
                <b>Subject Type</b>
              </div>
              <div className="col-sm-12 col-md-6 ">
                <Field as="select" name="subjectType" className="custom-select">
                  <option hidden>Select Subject Type...</option>
                  {arrayOfSubjectType.map((subjectType, index) => (
                    <option key={index} value={subjectType}>
                      {subjectType}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="subjectType"
                  render={msg => (
                    <div className="alert alert-primary" role="alert">
                      {msg}
                    </div>
                  )}
                />
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
                <ErrorMessage
                  name="branch"
                  render={msg => (
                    <div className="alert alert-primary" role="alert">
                      {msg}
                    </div>
                  )}
                />
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-sm-12 col-md-6 text-center">
                <b>Semester</b>
              </div>
              <div className="col-sm-12 col-md-6 ">
                <Field as="select" name="semester" className="custom-select">
                  <option hidden>Select Semester...</option>
                  {arrayOfSemester.map((semester, index) => (
                    <option key={index} value={semester}>
                      {semester}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="semester"
                  render={msg => (
                    <div className="alert alert-primary" role="alert">
                      {msg}
                    </div>
                  )}
                />
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
                    <b>{" Create Subject"}</b>
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
