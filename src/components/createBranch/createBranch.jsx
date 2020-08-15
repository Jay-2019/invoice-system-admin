import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import API from "../../config";
import { Loader } from "../index";

export default function CreateBranch(props) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Formik
      initialValues={{
        branchName: ""
      }}
      validationSchema={Yup.object({
        branchName: Yup.string()
          .uppercase()
          .matches(
            /^[ A-Za-z0-9_./+-]*$/,
            " Branch Name Contain only AlphaNumeric & Special Character(_,.,/,+,-) "
          )
          .required("Branch Name Required")
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        Axios.post(
          `${API}/createBranch/${localStorage.getItem("adminAuthToken")}`,
          values
        )
          .then(response => {
            if (response.status === 200 && !!response.data) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Branch Successfully Created :)",
                showConfirmButton: true,
                timer: 5000
              });
              setLoading(false);
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
        <div className="card-header text-success  border-secondary text-center">
          <i>
            {" "}
            <h2>Create Branch</h2>
          </i>
        </div>
        <div className="card-body">
          <br />
          <div>
            <div className="row">
              <div className="col-sm-12 col-md-6 text-center">
                <i>
                  <b> {"Branch Name"}</b>
                </i>
              </div>
              <div className="col-sm-12 col-md-6">
                <Field
                  type="string"
                  name="branchName"
                  placeholder="Branch "
                  className="form-control"
                />
                <ErrorMessage
                  name="branchName"
                  render={msg => (
                    <div className="alert alert-primary" role="alert">
                      {msg}
                    </div>
                  )}
                />
              </div>
            </div>
            <hr />
            <br />

            <div className="row">
              <div className="col text-center">
                <button
                  type="submit"
                  className="btn btn-outline-success  btn-block"
                >
                  <i>
                    <b>{" Create Branch"}</b>
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
