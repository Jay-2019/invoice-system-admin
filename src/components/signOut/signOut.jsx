import React, { StrictMode } from "react";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
export default function SignOut(props) {
  useEffect(() => {
    localStorage.removeItem("adminAuthToken");
   
  });
  return (
    <StrictMode>
      <Redirect to={"/adminSignIn"} />;
    </StrictMode>
  );
}