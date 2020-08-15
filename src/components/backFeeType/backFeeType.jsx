import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import { backFeeType } from "../../constant";
import API from "../../config";
import { Loader } from "../index";
import { calculateFee } from "./helper";

//DB -> backFeeType(collection) -> documentID
const backFeeDocumentId = "5ec376a132e3ab0f689a9d34";

export default function BackFeeType(props) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return isLoading ? (
    <Loader />
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
      </Form>
    </Formik>
  );
}
