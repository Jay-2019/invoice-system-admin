import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import API from "../../config";
import { adminAuthToken } from "../../constant";
import { Loader } from "../index";

export default function DisplayCourseFeeDueDate(props) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const [dueDate, setDueDate] = useState([]);

  useEffect(() => {
    Axios.get(`${API}/getCourseFeeDueDate/${adminAuthToken}`)
      .then(response => {
        setDueDate(response.data);
      })
      .catch(error => console.log(error.message));
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="card-header border-secondary text-success text-center">
        <i>
          <h2>{"Course Fee Due Dates"}</h2>
        </i>
      </div>
      <div className="card-body  text-center">
        {dueDate.map((data, index) => (
          <div key={index}>
            <div className="row">
              <div className="col">
                <b className="text-danger">{data.caste}</b>
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-12 col-md-6 ">
                <i>{"First Year"}</i>
              </div>
              <div className="col-sm-12 col-md-6 ">
                <b>
                  {new Date(data.firstYear)
                    .toLocaleString("en-GB")
                    .substring(0, 10)}
                </b>
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col-sm-12 col-md-6 ">
                <i>{"Second Year"}</i>
              </div>
              <div className="col-sm-12 col-md-6 ">
                <b>
                  {new Date(data.secondYear)
                    .toLocaleString("en-GB")
                    .substring(0, 10)}
                </b>
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col-sm-12 col-md-6 ">
                <i>{"Third Year"}</i>
              </div>
              <div className="col-sm-12 col-md-6 ">
                <b>
                  {new Date(data.thirdYear)
                    .toLocaleString("en-GB")
                    .substring(0, 10)}
                </b>
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col-sm-12 col-md-6 ">
                <i>{"Fourth Year"}</i>
              </div>
              <div className="col-sm-12 col-md-6 ">
                <b>
                  {new Date(data.fourthYear)
                    .toLocaleString("en-GB")
                    .substring(0, 10)}
                </b>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}
