import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import { useNavigationBar } from "../index";
import API from "../../config";

export default function CreateBranch(props) {
  const navigationBar = useNavigationBar();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
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
        branchName: ""
      }}
      validationSchema={Yup.object({
        branchName: Yup.string()
          .uppercase()
          .matches(
            /^[ A-Za-z0-9_./+-]*$/,
            " Branch Name Contain only AlphaNumeric & Special Character(_,.,/,+,-) "
          )
          .required("Required")
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        Axios.post(`${API}/createBranch/`, values)
          .then(response => {
            if (response.status === 200 && response.data) {
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
              <div className="card-header text-success  border-secondary text-center">
                <h2>Create Branch</h2>
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
                      <ErrorMessage name="branchName" />
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
