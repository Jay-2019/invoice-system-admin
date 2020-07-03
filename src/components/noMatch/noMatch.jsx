import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
export default function NoMatch(props) {
  useEffect(() => {
    localStorage.removeItem("adminAuthToken");
  });

  return (
    <>
      <h1>{"NoT Found"}</h1>;
      <Redirect exact to="/adminSignIn" />;
    </>
  );
}
