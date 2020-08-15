import React from "react";
import { Link } from "react-router-dom";
import { editIcon, deleteIcon } from "../assets/index";
import {adminAuthToken} from "../../constant";
export default function PrepareList(props) {
  const Card = ({ srNo, subjectId, subjectName, updateAt }) => (
    <>
      <div className="row text-success">
        <div className="col ">{srNo}</div>
        <div className="col">{subjectName}</div>
        <div className="col">
          {new Date(updateAt).toLocaleString("en-GB").substring(0, 10)}
        </div>

        <div className="col">
          <Link
            to={`/updateSubject/${subjectId}/${adminAuthToken}`}
          >
            <img src={editIcon} alt="edit icon" />
          </Link>
        </div>
        <div className="col">
          <Link
            to={`/deleteSubject/${subjectId}/${adminAuthToken}`}
          >
            <img src={deleteIcon} alt="delete icon" />
          </Link>
        </div>
      </div>
      <hr />
    </>
  );

  const listOfSubject = () => {
    return props.subjectData.map((data, index) => {
      const {
        _id,
        subjectName,
        subjectType,
        branch,
        semester,
        updatedAt
      } = data;

      return (
        <Card
          key={index}
          srNo={++index}
          subjectId={_id}
          subjectName={subjectName}
          updateAt={updatedAt}
        />
      );
    });
  };

  return (
    <>
      <div>
        <div className="row text-warning">
          <div className="col">
            <b> {"Sr No. "}</b>
          </div>

          <div className="col">
            <b>{"Subject"}</b>
          </div>

          <div className="col">
            <b>{"Update At "}</b>
          </div>

          <div className="col">
            <b>{"Edit"}</b>
          </div>

          <div className="col">
            <b>{"Delete"}</b>
          </div>
        </div>

        <hr />
        {listOfSubject()}
      </div>
    </>
  );
}
