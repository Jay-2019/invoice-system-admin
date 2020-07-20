import React from "react";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
export default function SignOut(props) {
  useEffect(() => {
    localStorage.removeItem("adminAuthToken");
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Sign-Out Successful.",
      showConfirmButton: true,
      timer: 3000
    });
  });

  return <Redirect to="/adminSignIn" />;
}
