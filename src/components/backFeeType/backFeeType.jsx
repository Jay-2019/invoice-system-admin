import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { backFeeType } from "../../constant";

export default function BackFeeType(props) {
  const calculateFee = values => {
    values.totalFee =
      values.delayFee +
      values.examinationFormFee +
      values.backPaper +
      values.otherCharges;
  };

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
        calculateFee(values);

        Axios.post(
          "http://localhost:4000/feePaymentDB/updateBackFeeType/" +
            "5ec376a132e3ab0f689a9d34",
          values
        )
          .then(response => {
            return response.data;
          })
          .catch(error => error.message);

        setSubmitting(false);
        resetForm();
        // props.history.push("/studentSignIn");
      }}
    >
      <Form>
        <br />
        <div className="d-flex justify-content-center">
          <div className="card text-white bg-dark w-75 ">
            <div className="card-header  text-center">
              <h2>Back Fee Type</h2>
            </div>
            <div className="card-body">
              <div>
                <div className="row">
                  <div className="col">
                    <b>{backFeeType.examinationFormFee}</b>
                  </div>
                  <div className="col">
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
                  <div className="col">
                    <b>{backFeeType.backPaper}</b>
                  </div>
                  <div className="col">
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
                  <div className="col">
                    <b>{backFeeType.delayFee}</b>
                  </div>
                  <div className="col">
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
                  <div className="col">
                    <b>{backFeeType.otherCharges}</b>
                  </div>
                  <div className="col">
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
                      className="btn btn-outline-success"
                    >
                      Update Fee Type
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
