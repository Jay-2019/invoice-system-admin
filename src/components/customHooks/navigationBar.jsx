import React from "react";
import { Link } from "react-router-dom";
import { adminAuthToken, backFeeDueDateDocumentId } from "../../constant";

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
          <div className=" navbar-nav">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <b> {"Branch"}</b>
              </button>
              <div className="dropdown-menu">
                {/* Create Branch Hyperlink */}
                <a
                  className="dropdown-item"
                  href={`/createBranch/${adminAuthToken}`}
                >
                  <b>Create Branch</b>
                </a>
                {/* List Branch Hyperlink */}
                <a
                  className="dropdown-item"
                  href={`/listBranch/${adminAuthToken}`}
                >
                  <b> Branch List</b>
                </a>
              </div>
            </div>
            &nbsp;
            {/* Subject Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <b> {"Subject"}</b>
              </button>
              <div className="dropdown-menu">
                {/* Create Subject Hyperlink */}
                <a
                  className="dropdown-item"
                  href={`/createSubject/${adminAuthToken}`}
                >
                  <b>Create Subject</b>
                </a>
                {/* List Subject Hyperlink */}
                <a
                  className="dropdown-item"
                  href={`/listSubject/${adminAuthToken}`}
                >
                  <b> Subject List</b>
                </a>
              </div>
            </div>
            &nbsp;
            {/* Course-Fee-Due-Date Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <b> CourseFee DueDate</b>
              </button>
              <div className="dropdown-menu">
                {/* Update Course-Fee-Due-Date  Hyperlink */}
                <a
                  className="dropdown-item"
                  href={`/updateCourseFeeDueDate/${adminAuthToken}`}
                >
                  <b>Update Course-Fee Due-Date</b>
                </a>

                {/* List Course-Fee-Due-Date */}
                <a
                  className="dropdown-item"
                  href={`/displayCourseFeeDueDate/${adminAuthToken}`}
                >
                  <b> List Course-Fee Due-Date</b>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
