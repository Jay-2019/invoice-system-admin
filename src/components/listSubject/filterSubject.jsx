import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import API from "../../config";
import {
  adminAuthToken,
  arrayOfSemester,
  arrayOfSubjectType
} from "../../constant";
import { Loader } from "../index";

export default function FilterSubject(props) {
  const [isLoading, setLoading] = useState(true);
  const [arrayOfBranch, setBranch] = useState(Array);

  useEffect(() => {
    let source = Axios.CancelToken.source();

    Axios.get(`${API}/getBranch`, {
      cancelToken: source.token
    })
      .then(response => {
        if (response.status === 200 && !!response.data.length) {
          setBranch(response.data);
          setLoading(false);
          return;
        }

        if (response.status === 200 && !response.data.length) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Branch Not Found!!!",
            showConfirmButton: true,
            timer: 5000
          });
          return props.history.push(`/createBranch/${adminAuthToken}`);
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
  }, [props.history]);

  return isLoading ? (
    <Loader />
  ) : (
    <Formik
      initialValues={{
        branch: "",
        semester: "",
        subjectType: ""
      }}
      validationSchema={Yup.object({
        branch: Yup.string()
          .oneOf(arrayOfBranch)
          .required("Select Branch"),
        semester: Yup.string()
          .oneOf(arrayOfSemester)
          .required("Select Semester"),
        subjectType: Yup.string()
          .oneOf(arrayOfSubjectType)
          .required("Select Subject Type")
      })}
      onSubmit={values => {
        const { branch, semester, subjectType } = values;

        if (branch && semester && subjectType) {
          Axios.get(`${API}/filterSubject/${branch}/${semester}/${subjectType}`)
            .then(response => {
              if (response.status === 200 && !!response.data.length) {
                props.sendFilterSubject(response.data);
                setLoading(false);
                return;
              }

              if (response.status === 200 && !response.data.length) {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Subject Not Found !!!",
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

          setLoading(true);
        }
      }}
    >
      <Form>
        <div className="row">
          <div className="col-sm-12 col-md-4 text-center">
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
          <div className="col-sm-12 col-md-4">
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
          <div className="col-sm-12 col-md-4">
            <Field as="select" name="subjectType" className="custom-select">
              <option hidden>Select subject Type...</option>
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
        <br />

        <div className="row">
          <div className="col text-center">
            <button
              type="submit"
              className="btn btn-outline-warning  btn-block"
            >
              <i>
                <b>{" Search Subjects"}</b>
              </i>
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
