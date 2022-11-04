import React from "react";
import Navbar from "./navbar/Navbar";
import Table from "./table/Table";
import ToastContainer from "./common/ToastContainer";

const Home = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="grid place-items-center xl:px-20">
        <h2 className="text-xl md:text-3xl my-4 p-2 font-semibold text-blue-700">
          OTA Update Management System
        </h2>
        <Table />
      </div>
    </>
  );
};

export default Home;
