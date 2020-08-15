import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import API from "../../config";
import { PrepareList } from "./index";
import { adminAuthToken } from "../../constant";
import { Loader } from "../index";

export default function ListBranch(props) {
  const [isLoading, setLoading] = useState(true);
  const [branchData, setBranchData] = useState(Array);

  // this useEffect call only when the componentDidMount
  // used for get data of list of Branches.
  useEffect(() => {
    let source = Axios.CancelToken.source();
    setLoading(true);
    Axios.get(`${API}/listBranch/${adminAuthToken}`, {
      cancelToken: source.token
    })
      .then(response => {
        if (response.status === 200 && !!response.data.length) {
          setBranchData(response.data);
          setLoading(false);
          return;
        }

        if (response.status === 200 && !response.data.length) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "There Is No Branch !!!",
            showConfirmButton: true,
            timer: 5000
          });
          setLoading(false);
          return;
        }

        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something Went Wrong!!! Please Try After Sometime.",
          showConfirmButton: true,
          timer: 5000
        });
        setLoading(false);
        return;
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
        return;
      });

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [props.history]);

  return isLoading ? (
    <Loader />
  ) : (
    <div key={Math.random()}>
      <PrepareList branchData={branchData} />
    </div>
  );
}
