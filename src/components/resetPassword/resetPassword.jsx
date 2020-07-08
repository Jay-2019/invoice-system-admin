import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import { arrayOfSecurityQuestions } from "../../constant";
import API from "../../config";

export default function ResetPassword(props) {
  return (
    <Formik
      initialValues={{
        verifiedEmail: "",
        createPassword: "",
        confirmPassword: "",
        securityQuestion: "",
        securityAnswer: ""
      }}
      validationSchema={Yup.object({
        verifiedEmail: Yup.string()
          .email("Enter valid email address")
          .required("Required"),

        createPassword: Yup.string()
          .min(4, "Password can contain min 4 Character.")
          .max(8, "Password can contain max 8 Character.")
          .matches(/[a-zA-Z]/, "Password can only contain letters.")
          .required("Password is required"),

        confirmPassword: Yup.string()
          .min(4, "Password can contain min 4 Character.")
          .max(8, "Password can contain max 8 Character.")
          .matches(/[a-zA-Z]/, "Password can only contain letters.")
          .required("Password is required"),

        securityQuestion: Yup.string()
          .oneOf(arrayOfSecurityQuestions)
          .required("Required"),

        securityAnswer: Yup.string()
          .min(4, "Answer can contain min 4 Character.")
          .max(20, "Answer can contain max 20 Character.")
          .required("Answer is required")
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (values.createPassword !== values.confirmPassword) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Password & Confirm Password Should be Match.",
            showConfirmButton: true,
            timer: 2000
          });
          resetForm();
          return;
        }

        Axios.post(`${API}/resetAdminPassword/`, values)
          .then(response => {
            if (response.status === 200 && response.data) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Password Reset Successful :)",
                showConfirmButton: true,
                timer: 2000
              });
              resetForm();
              return props.history.push("/adminSignIn");
            }

            if (response.status === 200 && response.data === null) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Admin Not Found!!! Please Enter Valid Information.",
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

        setSubmitting(true);
      }}
    >
      <Form>
        <br />
        <div className="d-flex justify-content-center">
          <div className="card text-white bg-dark border-light text-center">
            <div className="card-header text-warning border-secondary text-center">
              <i>
                <h2>Reset Password</h2>
              </i>
            </div>
            <div className="card-body">
              <div>
                <div className="row">
                  <div className="col">
                    <Field
                      type="string"
                      name="verifiedEmail"
                      placeholder="Verified Email "
                      className="form-control"
                    />
                    <ErrorMessage name="verifiedEmail" />
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col ">
                    <Field
                      type="password"
                      name="createPassword"
                      placeholder="Create Password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="createPassword"
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
                  <div className="col">
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="confirmPassword"
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
                  <div className="col">
                    <Field
                      as="select"
                      name="securityQuestion"
                      className="custom-select"
                    >
                      <option hidden>Select Security Question...</option>
                      {arrayOfSecurityQuestions.map((question, index) => (
                        <option key={index} value={question}>
                          {question}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="securityQuestion" />
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col">
                    <Field
                      type="password"
                      name="securityAnswer"
                      placeholder="Security Answer"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="securityAnswer"
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
                      className="btn btn-outline-warning  btn-block"
                    >
                      <i>
                        <b>{"Reset Password"}</b>
                      </i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <small id="note" className="form-text text-muted">
                  {"If You Are Lost Here Back To"}
                  <a href="/adminSignIn">
                    <b>{" Admin-Sign-In "}</b>
                  </a>
                </small>
              </div>
            </div>

            <div className="card-footer border-secondary text-center">
              Faculty of engineering & technology
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
