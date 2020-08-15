import React, { useState } from "react";
import { FilterSubject, PrepareList } from "./index";
import { adminAuthToken } from "../../constant";

export default function ListSubject(props) {
  const [subjectData, setSubjectData] = useState([]);

  const getFilterSubject = data => {
    setSubjectData(data);
  };

  return (
    <div key={Math.random()}>
      <div className="card-header text-success  border-secondary text-center">
        <i>
          <h2> {"Subjects List"} </h2>
        </i>
      </div>

      <div className="card-body">
        <div className="row text-warning"></div>
        <FilterSubject sendFilterSubject={getFilterSubject} />
        <hr />
        {!!subjectData.length ? (
          <PrepareList subjectData={subjectData} />
        ) : (
          <i className="text-warning text-center">
            <h4>{"There Is No Items, Please Select Valid Options"}</h4>

            <h4> {"OR "}</h4>
            <h4>
              <a href={`/createSubject/${adminAuthToken}`}>
                {"Click Here to Create Subjects "}
              </a>
            </h4>
          </i>
        )}
      </div>
    </div>
  );
}
