import React, { useContext, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import Table from "./table/Table";
import ToastContainer from "./common/ToastContainer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from '../context/AppContext'

const Home = () => {
  let navigate = useNavigate();
  const {state ,dispatch} = useContext(AppContext)
  const isLogin = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      return navigate("/login");
    }
  };

  const setUser = (user) => {
    dispatch({
      type: "setDevice",
      payload : {user}
    })
  }

  const getData = async () => {
    let res = await axios.get("http://localhost:3000/api/products");
    let email = JSON.parse(localStorage.getItem("user")).email;
    let user = res.data.find((item) => item.email === email);
    // if user exists
    if (user) {
      setUser(user)
    }
    //if user doesn't exixts
    else {
      let new_document = {
        email,
        isAdmin: false,
        devices: [],
        product: [],
      };
      axios
        .post("http://localhost:3000/api/products", new_document)
        .then((res) => setUser(res.data));
    }
  };
  useEffect(() => {
    getData();
    isLogin();
  }, []);

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
