import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import { backFeeType } from "../../constant";
import API from "../../config";
import { calculateFee } from "./helper";
import { useNavigationBar } from "../index";
//DB -> backFeeType(collection) -> documentID
const backFeeDocumentId = "5ec376a132e3ab0f689a9d34";

export default function BackFeeType(props) {
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
        totalFee: "",
        examinationFormFee: "",
        backPaper: "",
        delayFee: "",
        otherCharges: ""
      }}
      validationSchema={Yup.object({
        examinationFormFee: Yup.string()
          .matches(
            /\d+(\.\d{1,2})?/,
            " Fee contain only Numbers/Decimal-Number (0-9) "
          )
          .required("Required"),

        backPaper: Yup.string()
          .matches(
            /\d+(\.\d{1,2})?/,
            " Fee contain only Numbers/Decimal-Number (0-9) "
          )
          .required("Required"),

        delayFee: Yup.string()
          .matches(
            /\d+(\.\d{1,2})?/,
            " Fee contain only Numbers/Decimal-Number (0-9) "
          )
          .required("Required"),

        otherCharges: Yup.string()
          .matches(
            /\d+(\.\d{1,2})?/,
            " Fee contain only Numbers/Decimal-Number (0-9) "
          )
          .required("Required"),

        totalFee: Yup.string().matches(
          /\d+(\.\d{1,2})?/,
          " Fee contain only Numbers/Decimal-Number (0-9) "
        )
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setLoading(false);
        values.totalFee = calculateFee(values);

        Axios.post(`${API}/updateBackFeeType/${backFeeDocumentId}`, values)
          .then(response => {
            if (response.status === 200 && response.data) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Back-Fee-Type Successfully Updated :)",
                showConfirmButton: true,
                timer: 5000
              });
              resetForm();
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
              resetForm();
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
            resetForm();
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
            resetForm();
            return setLoading(false);
          });

        setSubmitting(true);
      }}
    >
      <Form>
        {navigationBar}
        <hr />
        <div className="d-flex justify-content-center">
          <div className="col-sm-12 col-md-8">
            <div className="card text-white border-light bg-dark  ">
              <div className="card-header text-success border-secondary text-center">
                <i>
                  <h2> {"Update Back Fee Type"}</h2>
                </i>
              </div>
              <div className="card-body">
                <div>
                  <div className="row">
                    <div className="col-sm-12 col-md-6 text-center">
                      <b>{backFeeType.examinationFormFee}</b>
                    </div>
                    <div className="col-sm-12 col-md-6 ">
                      <Field
                        type="number"
                        name="examinationFormFee"
                        placeholder={backFeeType.examinationFormFee}
                        className="form-control"
                      />
                      <ErrorMessage name="delayFee" />
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12 col-md-6 text-center">
                      <b>{backFeeType.backPaper}</b>
                    </div>
                    <div className="col-sm-12 col-md-6 ">
                      <Field
                        type="number"
                        name="backPaper"
                        placeholder={backFeeType.backPaper}
                        className="form-control"
                      />
                      <ErrorMessage name="delayFee" />
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12 col-md-6 text-center">
                      <b>{backFeeType.delayFee}</b>
                    </div>
                    <div className="col-sm-12 col-md-6 ">
                      <Field
                        type="number"
                        name="delayFee"
                        placeholder={backFeeType.delayFee}
                        className="form-control"
                      />
                      <ErrorMessage name="delayFee" />
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12 col-md-6 text-center">
                      <b>{backFeeType.otherCharges}</b>
                    </div>
                    <div className="col-sm-12 col-md-6 ">
                      <Field
                        type="number"
                        name="otherCharges"
                        placeholder={backFeeType.otherCharges}
                        className="form-control"
                      />
                      <ErrorMessage name="otherCharges" />
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col text-center">
                      <button
                        type="submit"
                        //   disabled={isSubmitting}
                        className="btn btn-outline-success btn-block"
                      >
                        <i>
                          <b>Update Fee Type</b>
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
