import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
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
            if (response.status === 200) {
              window.alert("Branch Successfully Created");
              resetForm();
              return;
            }

            return window.alert(
              "Something Went Wrong!!! Please Try Again or After Sometime "
            );
          })
          .catch(error => error.message);

        setSubmitting(true);
      }}
    >
      <Form>
        {navigationBar}
        <hr />
        <div className="d-flex justify-content-center">
          <div className="card text-white bg-dark w-75 ">
            <div className="card-header  text-center">
              <h2>Create Branch</h2>
            </div>
            <div className="card-body">
              <div>
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>Branch Name</b>
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
            <div className="card-footer text-center">
              Faculty of engineering & technology
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
