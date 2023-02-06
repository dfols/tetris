import React from "react";
import API from "../api";
import { useQuery } from "react-query";

let api = new API();

function APITest() {
  const { isLoading, isError, data, error } = useQuery("testmessage", () =>
    api.request("getmessage")
  );

  let message = null;

  if (isLoading) {
    message = <span>Calling API...</span>;
  } else if (isError) {
    message = <span>Error: {error.message}</span>;
  } else {
    message = <span>{data.message}</span>;
  }

  return (
    <div>
      <h2>API server message:</h2>
      <h3>{message}</h3>
    </div>
  );
}

export default APITest;
