import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import { arrayOfSubjectType, arrayOfSemester } from "../../constant";
import API from "../../config";
import { Loader } from "../index";

export default function UpdateSubject(props) {
  const { subjectId, adminAuthToken } = props.match.params;

  const [isLoading, setLoading] = useState(true);
  const [subject, setSubject] = useState({});
  const [arrayOfBranch, setArrayOfBranch] = useState([]);

  useEffect(() => {
    let source = Axios.CancelToken.source();

    (async () => {
      const [targetSubject, branch] = await Promise.all([
        //get target subject data
        Axios.get(`${API}/getTargetSubject/${subjectId}/${adminAuthToken}`, {
          cancelToken: source.token
        }),
        // get Array of branchName
        Axios.get(`${API}/getBranch`, {
          cancelToken: source.token
        })
      ]);

      if (targetSubject.status === 200 && !!targetSubject.data) {
        setSubject(targetSubject.data);
        setLoading(false);
      }

      if (branch.status === 200 && !!branch.data.length) {
        setArrayOfBranch(branch.data);
        setLoading(false);
      }

      if (targetSubject.status === 200 && !targetSubject) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Target Subject Not Found!!!.",
          showConfirmButton: true,
          timer: 5000
        });
        return props.history.push(`/listSubject/${adminAuthToken}`);
      }

      if (branch.status === 200 && !branch.data.length) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Branch Not Found!!!",
          showConfirmButton: true,
          timer: 5000
        });
        return props.history.push(`/listSubject/${adminAuthToken}`);
      }

      setLoading(false);
    })();

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [subjectId, adminAuthToken, props.history]);

  return isLoading ? (
    <Loader />
  ) : (
    <Formik
      initialValues={{
        subjectName: subject.subjectName,
        subjectType: subject.subjectType,
        branch: subject.branch,
        semester: subject.semester
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
        Axios.post(
          `${API}/updateTargetSubject/${subjectId}/${adminAuthToken}`,
          values
        )
          .then(response => {
            if (response.status === 200 && !!response.data) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Subject Updated Successfully  :)",
                showConfirmButton: true,
                timer: 5000
              });
              props.history.push(`/listSubject/${adminAuthToken}`);
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
        setSubmitting(true);
        setLoading(true);
        resetForm();
      }}
    >
      <Form>
        <div className="card-header text-success border-secondary text-center">
          <i>
            <h2>Update Subject</h2>
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
                    <b>{" Update Subject"}</b>
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
