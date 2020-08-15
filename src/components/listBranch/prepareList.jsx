import React from "react";
import { Link } from "react-router-dom";
import { editIcon, deleteIcon } from "../assets/index";
import { adminAuthToken } from "../../constant";
export default function PrepareList(props) {
  const Card = ({ srNo, branchId, branchName, updateAt }) => (
    <>
      <div className="row text-success">
        <div className="col ">{srNo}</div>
        <div className="col">{branchName}</div>
        <div className="col">
          {new Date(updateAt).toLocaleString("en-GB").substring(0, 10)}
        </div>

        <div className="col">
          <Link to={`/updateBranch/${branchId}/${adminAuthToken}`}>
            <img src={editIcon} alt="edit icon" />
          </Link>
        </div>
        <div className="col">
          <Link to={`/deleteBranch/${branchId}/${adminAuthToken}`}>
            <img src={deleteIcon} alt="delete icon" />
          </Link>
        </div>
      </div>
      <hr />
    </>
  );

  const listOfBranch = () => {
    return props.branchData.map((data, index) => {
      const { _id, branchName, updatedAt } = data;

      return (
        <Card
          key={index}
          srNo={++index}
          branchId={_id}
          branchName={branchName}
          updateAt={updatedAt}
        />
      );
    });
  };

  return (
    <>
      <div className="card-header text-success  border-secondary text-center">
        <i>
          <h2> {"Branches List"}</h2>
        </i>
      </div>

      <div className="card-body">
        {!!props.branchData.length ? (
          <>
            {" "}
            <div className="row text-warning">
              <div className="col">
                <b> {"Sr No. "}</b>
              </div>

              <div className="col">
                <b>{"Branch"}</b>
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
            {listOfBranch()}
          </>
        ) : (
          <>
            <i className="text-warning">
              <h4>{"There Is No Items "}</h4>
              <h4>
                <a href={`/createBranch/${adminAuthToken}`}>
                  {"Click Here to Create Branches "}
                </a>
              </h4>
            </i>
          </>
        )}
      </div>
    </>
  );
}
