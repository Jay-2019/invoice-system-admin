import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";
import API from "../../config";
import { Loader } from "../index";

export default function DeleteBranch(props) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let source = Axios.CancelToken.source();
    setLoading(true);
    Axios.delete(
      `${API}/deleteBranch/${
        props.match.params.branchId
      }/${localStorage.getItem("adminAuthToken")}`,
      {
        cancelToken: source.token
      }
    )
      .then(response => {
        if (response.status === 200 && !!response.data) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Branch Deleted Successfully!!!",
            showConfirmButton: true,
            timer: 5000
          });
          return props.history.push(
            `/listBranch/${localStorage.getItem("adminAuthToken")}`
          );
        }

        if (response.status === 200 && !response.data) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Failed Try Again Later!!!",
            showConfirmButton: true,
            timer: 5000
          });
          return props.history.push(
            `/listBranch/${localStorage.getItem("adminAuthToken")}`
          );
        }

        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something Went Wrong!!! Please Try After Sometime.",
          showConfirmButton: true,
          timer: 5000
        });
        setLoading(false);
        return props.history.push(
          `/listBranch/${localStorage.getItem("adminAuthToken")}`
        );
      })
      .catch(error => {
        console.log(error.message);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something Went Wrong!!! Please Try After Sometime.",
          showConfirmButton: true,
          timer: 5000
        });
        setLoading(false);
        return props.history.push(
          `/listBranch/${localStorage.getItem("adminAuthToken")}`
        );
      });

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [props.match.params.branchId, props.history]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Redirect to="/listBranch" />
    </>
  );
}
