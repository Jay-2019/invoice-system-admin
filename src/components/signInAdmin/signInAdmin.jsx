import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import API from "../../config";

export default function SignInAdmin(props) {
  const [getCaptcha, setCaptcha] = useState();

  const handleCaptcha = () => {
    const alphaNumericString =
      "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const captchaLength = 8;
    var randomString = "";
    for (let i = 0; i < captchaLength; i++) {
      var randomNumber = Math.floor(Math.random() * alphaNumericString.length);
      randomString += alphaNumericString.substring(
        randomNumber,
        randomNumber + 1
      );
    }

    var c = document.getElementById("captcha");
    var ctx = c.getContext("2d");

    ctx.font = "40px Georgia";
    ctx.font = "30px Verdana";
    // Create gradient
    let gradient = ctx.createLinearGradient(0, 0, c.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillText(randomString, 10, 25);
    setCaptcha(randomString);
  };

  useEffect(() => {
    handleCaptcha();
  }, []);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        captcha: ""
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Required"),

        password: Yup.string()
          .min(4, "Invalid Password.")
          .max(8, "Invalid Password.")
          .matches(/[a-zA-Z]/, "Password can only contain letters.")
          .required("Password is required"),
        captcha: Yup.string().required("Please Fill Required Captcha")
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (getCaptcha !== values.captcha)
          return window.alert("Please Enter valid Captcha");

        Axios.get(
          `${API}/adminAuthentication/${values.email}/${values.password}`
        )
          .then(response => {
            if (response.status === 200 && response.data === null) {
              window.alert("Admin Not Found!!! Please Enter Valid Information");
              resetForm();
            }

            if (response.status === 200) {
              localStorage.setItem("adminAuthToken", response.data._id);
              return props.history.push(
                `/createSubject/${localStorage.getItem("adminAuthToken")}`
              );
            }

            return window.alert(
              "Admin Not Found!!! Please Enter Valid Information"
            );
          })
          .catch(error => error.message);

        setSubmitting(true);
      }}
    >
      <Form>
        <br />
        <div className="d-flex justify-content-center ">
          <div className="col-sm-12 col-md-6">
            <div className="card text-white border-light bg-dark">
              <div className="card-header text-center text-warning border-secondary">
                <h2>Admin SignIn</h2>
              </div>
              <div className="card-body ">
                <div>
                  <br />
                  <div className="row">
                    <div className="col">
                      <Field
                        name="email"
                        type="email"
                        placeholder="admin@gmail.com"
                        className="form-control"
                      />

                      <ErrorMessage
                        name="email"
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
                    <div className="col">
                      <Field
                        type="password"
                        name="password"
                        placeholder="password"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="password"
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
                      <canvas id="captcha" width="200" height="30"></canvas>
                    </div>
                  </div>
                  <br />

                  <div className="row">
                    <div className="col">
                      <Field
                        name="captcha"
                        className="form-control"
                        id="userInputCaptcha"
                        placeholder="Fill Captcha"
                      />
                      <ErrorMessage
                        name="captcha"
                        render={msg => (
                          <div className="alert alert-primary" role="alert">
                            {msg}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <br />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn  btn-outline-secondary btn-block"
                  >
                    <b>{" Sign In "}</b>
                  </button>
                </div>

                <div className="text-center">
                  <small id="note" className="form-text text-muted">
                    {"  If You Forgot Your Password "}
                    <a href="/resetPassword">
                      <b>{" Reset-Password "}</b>
                    </a>
                  </small>
                </div>
              </div>
              <div className="card-footer border-secondary text-center text-muted">
                Faculty of engineering & technology
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
