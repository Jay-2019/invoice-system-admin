import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { courseFeeType, arrayOfYear } from "../../constant";
import { useNavigationBar } from "../index";
import { mapYearWithId, calculateFee } from "./helper";
import API from "../../config";

export default function CourseFeeType(props) {
  const navigationBar = useNavigationBar();

  return (
    <Formik
      initialValues={{
        year: "",
        totalFee: "",
        delayFee: "",
        studyTripFee: "",
        tuitionFee: "",
        laboratory: "",
        securityFee: "",
        hostelFee: "",
        otherCharges: "",
        entranceFees: "",
        centralLibraryFee: "",
        studentSmartCardFee: "",
        sportsAndCulturalProgramFee: "",
        studentWelfareFee: "",
        developmentFee: "",
        studentAcademicGuide: "",
        examinationFee: "",
        energyCharges: "",
        internetFee: ""
      }}
      validationSchema={Yup.object({
        studyTripFee: Yup.string()
          .matches(
            /\d+(\.\d{1,2})?/,
            " Fee contain only Numbers/Decimal-Number (0-9) "
          )
          .required("Required"),
        tuitionFee: Yup.string()
          .matches(
            /\d+(\.\d{1,2})?/,
            " Fee contain only Numbers/Decimal-Number (0-9) "
          )
          .required("Required"),
        laboratory: Yup.string()
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
        securityFee: Yup.string()
          .matches(
            /\d+(\.\d{1,2})?/,
            " Fee contain only Numbers/Decimal-Number (0-9) "
          )
          .required("Required"),
        hostelFee: Yup.string()
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
        entranceFees: Yup.string()
          .matches(
            /\d+(\.\d{1,2})?/,
            " Fee contain only Numbers/Decimal-Number (0-9) "
          )
          .required("Required"),
        centralLibraryFee: Yup.string()
          .matches(
            /\d+(\.\d{1,2})?/,
            " Fee contain only Numbers/Decimal-Number (0-9) "
          )
          .required("Required"),
        studentSmartCardFee: Yup.string()
          .matches(
            /\d+(\.\d{1,2})?/,
            " Fee contain only Numbers/Decimal-Number (0-9) "
          )
          .required("Required"),
        sportsAndCulturalProgramFee: Yup.string()
          .matches(
            /\d+(\.\d{1,2})?/,
            " Fee contain only Numbers/Decimal-Number (0-9) "
          )
          .required("Required"),
        studentWelfareFee: Yup.string()
          .matches(
            /\d+(\.\d{1,2})?/,
            " Fee contain only Numbers/Decimal-Number (0-9) "
          )
          .required("Required"),
        developmentFee: Yup.string()
          .matches(
            /\d+(\.\d{1,2})?/,
            " Fee contain only Numbers/Decimal-Number (0-9) "
          )
          .required("Required"),
        studentAcademicGuide: Yup.string()
          .matches(
            /\d+(\.\d{1,2})?/,
            " Fee contain only Numbers/Decimal-Number (0-9) "
          )
          .required("Required"),
        examinationFee: Yup.string()
          .matches(
            /\d+(\.\d{1,2})?/,
            " Fee contain only Numbers/Decimal-Number (0-9) "
          )
          .required("Required"),
        energyCharges: Yup.string()
          .matches(
            /\d+(\.\d{1,2})?/,
            " Fee contain only Numbers/Decimal-Number (0-9) "
          )
          .required("Required"),
        internetFee: Yup.string()
          .matches(
            /\d+(\.\d{1,2})?/,
            " Fee contain only Numbers/Decimal-Number (0-9) "
          )
          .required("Required"),
        totalFee: Yup.string().matches(
          /\d+(\.\d{1,2})?/,
          " Fee contain only Numbers/Decimal-Number (0-9) "
        ),
        year: Yup.string()
          .oneOf(arrayOfYear, "Invalid Gender")
          .required("Required")
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        values.totalFee = calculateFee(values);

        Axios.post(
          `${API}/updateCourseFeeType/${mapYearWithId(values.year)}`,
          values
        )
          .then(response => {
            if (response.status === 200) {
              window.alert("Course-Fee-Type Successfully Updated");
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
              <h2>Update Course Fee Type</h2>
            </div>
            <div className="card-body">
              <div>
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>Year</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
                    <Field as="select" name="year" className="custom-select">
                      <option hidden>Select Year...</option>
                      {arrayOfYear.map((data, index) => (
                        <option key={index} value={data}>
                          {data}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="year" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>{courseFeeType.studyTripFee}</b>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <Field
                      type="number"
                      name="studyTripFee"
                      placeholder={courseFeeType.studyTripFee}
                      className="form-control"
                    />
                    <ErrorMessage name="studyTripFee" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>{courseFeeType.tuitionFee}</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
                    <Field
                      type="number"
                      name="tuitionFee"
                      placeholder={courseFeeType.tuitionFee}
                      className="form-control"
                    />
                    <ErrorMessage name="tuitionFee" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>{courseFeeType.laboratory}</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
                    <Field
                      type="number"
                      name="laboratory"
                      placeholder={courseFeeType.laboratory}
                      className="form-control"
                    />
                    <ErrorMessage name="laboratory" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>{courseFeeType.delayFee}</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
                    <Field
                      type="number"
                      name="delayFee"
                      placeholder={courseFeeType.delayFee}
                      className="form-control"
                    />
                    <ErrorMessage name="delayFee" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>{courseFeeType.securityFee}</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
                    <Field
                      type="number"
                      name="securityFee"
                      placeholder={courseFeeType.securityFee}
                      className="form-control"
                    />
                    <ErrorMessage name="securityFee" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>{courseFeeType.hostelFee}</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
                    <Field
                      type="number"
                      name="hostelFee"
                      placeholder={courseFeeType.hostelFee}
                      className="form-control"
                    />
                    <ErrorMessage name="hostelFee" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>{courseFeeType.otherCharges}</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
                    <Field
                      type="number"
                      name="otherCharges"
                      placeholder={courseFeeType.otherCharges}
                      className="form-control"
                    />
                    <ErrorMessage name="otherCharges" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>{courseFeeType.entranceFees}</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
                    <Field
                      type="number"
                      name="entranceFees"
                      placeholder={courseFeeType.entranceFees}
                      className="form-control"
                    />
                    <ErrorMessage name="entranceFees" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>{courseFeeType.centralLibraryFee}</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
                    <Field
                      type="number"
                      name="centralLibraryFee"
                      placeholder={courseFeeType.centralLibraryFee}
                      className="form-control"
                    />
                    <ErrorMessage name="centralLibraryFee" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>{courseFeeType.studentSmartCardFee}</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
                    <Field
                      type="number"
                      name="studentSmartCardFee"
                      placeholder={courseFeeType.studentSmartCardFee}
                      className="form-control"
                    />
                    <ErrorMessage name="studentSmartCardFee" />
                  </div>
                </div>
                <hr />
                {/* sportsAndCulturalProgramFee */}
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>{courseFeeType.sportsAndCulturalProgramFee}</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
                    <Field
                      type="number"
                      name="sportsAndCulturalProgramFee"
                      placeholder={courseFeeType.sportsAndCulturalProgramFee}
                      className="form-control"
                    />
                    <ErrorMessage name="sportsAndCulturalProgramFee" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>{courseFeeType.studentWelfareFee}</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
                    <Field
                      type="number"
                      name="studentWelfareFee"
                      placeholder={courseFeeType.studentWelfareFee}
                      className="form-control"
                    />
                    <ErrorMessage name="studentWelfareFee" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>{courseFeeType.developmentFee}</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
                    <Field
                      type="number"
                      name="developmentFee"
                      placeholder={courseFeeType.developmentFee}
                      className="form-control"
                    />
                    <ErrorMessage name="developmentFee" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>{courseFeeType.studentAcademicGuide}</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
                    <Field
                      type="number"
                      name="studentAcademicGuide"
                      placeholder={courseFeeType.studentAcademicGuide}
                      className="form-control"
                    />
                    <ErrorMessage name="studentAcademicGuide" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>{courseFeeType.examinationFee}</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
                    <Field
                      type="number"
                      name="examinationFee"
                      placeholder={courseFeeType.examinationFee}
                      className="form-control"
                    />
                    <ErrorMessage name="examinationFee" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>{courseFeeType.energyCharges}</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
                    <Field
                      type="number"
                      name="energyCharges"
                      placeholder={courseFeeType.energyCharges}
                      className="form-control"
                    />
                    <ErrorMessage name="energyCharges" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12 col-md-6 text-center">
                    <b>{courseFeeType.internetFee}</b>
                  </div>
                  <div className="col-sm-12 col-md-6 ">
                    <Field
                      type="number"
                      name="internetFee"
                      placeholder={courseFeeType.internetFee}
                      className="form-control"
                    />
                    <ErrorMessage name="internetFee" />
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col text-center">
                    <button
                      type="submit"
                      className="btn btn-outline-success btn-block"
                    >
                      <i>
                        <b>{"  Update Fee Type"}</b>
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
