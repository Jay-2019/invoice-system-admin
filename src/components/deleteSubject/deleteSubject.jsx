import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";
import API from "../../config";
import { Loader } from "../index";

export default function DeleteSubject(props) {
  const { subjectId, adminAuthToken } = props.match.params;
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let source = Axios.CancelToken.source();
    setLoading(true);
    Axios.delete(`${API}/deleteTargetSubject/${subjectId}/${adminAuthToken}`, {
      cancelToken: source.token
    })
      .then(response => {
        if (response.status === 200 && !!response.data) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Subject Deleted Successfully!!!",
            showConfirmButton: true,
            timer: 5000
          });
          return props.history.push(`/listSubject/${adminAuthToken}`);
        }

        if (response.status === 200 && !response.data) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Failed Try Again Later!!!",
            showConfirmButton: true,
            timer: 5000
          });
          return props.history.push(`/listSubject/${adminAuthToken}`);
        }

        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something Went Wrong!!! Please Try After Sometime.",
          showConfirmButton: true,
          timer: 5000
        });
        setLoading(false);
        return props.history.push(`/listSubject/${adminAuthToken}`);
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
        return props.history.push(`/listSubject/${adminAuthToken}`);
      });

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [subjectId, adminAuthToken, props.history]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Redirect to="/listSubject" />
    </>
  );
}
