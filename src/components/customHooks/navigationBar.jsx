import React from "react";
import { Link } from "react-router-dom";

export default function useNavigationBar(props) {
  return (
    <div className="card  bg-dark text-white text-center">
      {/* navbar navbar-dark bg-dark */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <b>
          <a
            className="navbar-brand"
            href={"/myProfile/" + localStorage.getItem("token")}
          >
            {props}
          </a>
        </b>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className=" collapse navbar-collapse" id="navbarNavAltMarkup">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className=" navbar-nav">
            <Link
              className="nav-item nav-link "
              to={`/createBranch/${localStorage.getItem("adminAuthToken")}`}
            >
              <b>Create Branch</b>
            </Link>

            <Link
              className="nav-item nav-link "
              to={`/createSubject/${localStorage.getItem("adminAuthToken")}`}
            >
              <b> Create Subject</b>
            </Link>

            <Link
              className="nav-item nav-link "
              to={`/updateCourseFeeDueDate/${localStorage.getItem(
                "adminAuthToken"
              )}`}
            >
              <b> Course Fee DueDate</b>
            </Link>

            <Link
              className="nav-item nav-link "
              to={`/updateCourseFeeType/${localStorage.getItem(
                "adminAuthToken"
              )}`}
            >
              <b> CourseFee Type</b>
            </Link>
            <Link
              className="nav-item nav-link "
              to={`/updateBackFeeType/${localStorage.getItem(
                "adminAuthToken"
              )}`}
            >
              <b> BackFee Type</b>
            </Link>
            <Link
              className="nav-item nav-link "
              to={`/updateBackFeeDueDate/${localStorage.getItem(
                "adminAuthToken"
              )}`}
            >
              <b> BackFee DueDate</b>
            </Link>
            <Link className="nav-item nav-link " to={"/signOut"}>
              <b> Sign Out</b>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
