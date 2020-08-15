import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import API from "../../config";
import { Loader } from "../index";

export default function UpdateBranch(props) {
  const [branchName, setBranchName] = useState("");
  const [isLoading, setLoading] = useState(true);
  const { branchId, adminAuthToken } = props.match.params;

  useEffect(() => {
    let source = Axios.CancelToken.source();
    setLoading(true);
    Axios.get(`${API}/getParticularBranch/${branchId}/${adminAuthToken}`, {
      cancelToken: source.token
    })
      .then(response => {
        if (response.status === 200 && !!response.data.length) {
          setBranchName(response.data);
          setLoading(false);
          return;
        }

        if (response.status === 200 && !response.data.length) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Branch Not Exist !!!",
            showConfirmButton: true,
            timer: 5000
          });
          return props.history.push(`/listBranch/${adminAuthToken}`);
        }

        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something Went Wrong!!! Please Try After Sometime.",
          showConfirmButton: true,
          timer: 5000
        });
        setLoading(false);
        return props.history.push(`/listBranch/${adminAuthToken}`);
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
        return props.history.push(`/listBranch/${adminAuthToken}`);
      });

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [branchId, adminAuthToken, props]);

  return isLoading ? (
    <Loader />
  ) : (
    <Formik
      initialValues={{
        branchName: branchName
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
          `${API}/updateTargetBranch/${branchId}/${adminAuthToken}`,
          values
        )
          .then(response => {
            if (response.status === 200 && !!response.data) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Branch Successfully Update :)",
                showConfirmButton: true,
                timer: 5000
              });
              setLoading(false);
              return props.history.push(`/listBranch/${adminAuthToken}`);
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
              return props.history.push(`/listBranch/${adminAuthToken}`);
            }

            Swal.fire({
              position: "center",
              icon: "error",
              title: "Something Went Wrong!!! Please Try After Sometime.",
              showConfirmButton: true,
              timer: 5000
            });
            setLoading(false);
            return props.history.push(`/listBranch/${adminAuthToken}`);
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
            return props.history.push(`/listBranch/${adminAuthToken}`);
          });

        setSubmitting(true);
        setLoading(true);
        resetForm();
      }}
    >
      <Form>
        <div className="card-header text-success  border-secondary text-center">
          <h2>Update Branch</h2>
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
                    <b>{" Update Branch"}</b>
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
