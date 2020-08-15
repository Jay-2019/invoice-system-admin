import React from "react";

export default function Loader() {
  return (
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
  );
}
