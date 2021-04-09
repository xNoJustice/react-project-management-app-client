import React from "react";
import "./spinner.css";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-64 h-64 ease-linear border-8 border-t-8 border-gray-200 rounded-full loader"></div>
  );
};

export default Spinner;
