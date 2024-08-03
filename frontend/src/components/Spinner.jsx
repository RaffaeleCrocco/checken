import React from "react";

const Spinner = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="animate-spin size-8 border-[3px] border-current border-t-transparent text-gray-800 rounded-full">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
