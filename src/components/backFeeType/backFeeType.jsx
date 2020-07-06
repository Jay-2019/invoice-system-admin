import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { backFeeType } from "../../constant";
import API from "../../config";
import { calculateFee } from "./helper";
import { useNavigationBar } from "../index";

export default function BackFeeType(props) {
  const navigationBar = useNavigationBar();

  return (
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

        Axios.post(`${API}/updateBackFeeType/5ec376a132e3ab0f689a9d34`, values)
          .then(response => {
            if (response.status === 200) {
              window.alert("Back-Fee-Type Successfully Updated");
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
              <h2>Update Back Fee Type</h2>
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
            <div className="card-footer text-center">
              Faculty of engineering & technology
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
