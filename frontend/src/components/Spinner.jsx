import React from "react";
import checkenlittle from "../assets/app-icon.png";

const Spinner = () => {
  return (
    <div className="w-full min-h-[50vh] flex flex-col justify-center items-center">
      <img src={checkenlittle} className="w-[150px]" />
      <div className="animate-spin size-8 border-[3px] border-current border-t-transparent text-gray-800 rounded-full">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
