import Sidebar from "@/components/Sidebar";
import React from "react";

const Trending = () => {
  return (
    <div className="flex relative">
      <div className="w-72 fixed sidebar">
        <Sidebar />
      </div>
      <div className="dark:bg-main-dark-bg bg-white  bg-main-bg min-h-screen md:ml-72 w-full  ">
        <p>Trending Browse</p>
      </div>
    </div>
  );
};

export default Trending;
