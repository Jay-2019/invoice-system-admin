import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import { useNavigationBar } from "../index";
import API from "../../config";

export default function CreateBranch(props) {
  const navigationBar = useNavigationBar();

  return (
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
                timer: 2000
              });
              resetForm();
              return;
            };

            if (response.status === 200 && response.data === null) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed!!! Please Try Again.",
                showConfirmButton: true,
                timer: 2000
              });
              resetForm();
              return;
            };


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
                        {" "}
                        <b>Branch Name</b>
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
