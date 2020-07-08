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
      title: "Sign-In Successful :)",
      showConfirmButton: true,
      timer: 2000
    });
  });

  return <Redirect to="/adminSignIn" />;
}
