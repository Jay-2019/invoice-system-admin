import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
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
          return window.alert("Password & Confirm Password Should be Match");
        }

        Axios.post(`${API}/resetAdminPassword/`, values)
          .then(response => {
            if (response.status === 200) {
              window.alert("Password Reset Successful ");
              return props.history.push("/adminSignIn");
            }

            return window.alert(
              "Password Reset Failed!!! Please Try After Sometime "
            );
          })
          .catch(error => error.message);

        setSubmitting(true);
        resetForm();
      }}
    >
      <Form>
        <hr />
        <div className="d-flex justify-content-center">
          <div className="card text-white bg-dark w-50 ">
            <div className="card-header  text-center">
              <h2>Reset Password</h2>
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
                      className="btn btn-outline-success  btn-block"
                    >
                      <i>
                        <b>{"Reset Password"}</b>
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
