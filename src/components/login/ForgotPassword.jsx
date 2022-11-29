import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonSpinner from "../common/ButtonSpinner";
import ToastContainer from "../common/ToastContainer";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const buttonRef = useRef()
  const spinnerRef = useRef()
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    buttonRef.current.classList.add('hidden')
    spinnerRef.current.classList.remove('hidden')
    let response = await axios.get(
      "https://six-sense-mobility-iot.vercel.app/api/users"
    );
    let user = response.data.find((ele) => ele.email === email);

    if (!user) {
      buttonRef.current.classList.remove('hidden')
      spinnerRef.current.classList.add('hidden')
      return toast.warn("user doesn't exists.");
    }
    buttonRef.current.classList.remove('hidden')
    spinnerRef.current.classList.add('hidden')
    localStorage.setItem("recoveryEmail", email);
    navigate("/forgotOtp");
  };

  useEffect(() => {
    let user = localStorage.getItem('user')
    if(user){
      return navigate('/')
    }
  }, [])
  

  return (
    <div className="w-full h-[100vh] flex flex-col md:flex-row justify-evenly items-center">
      <ToastContainer />
      <div className="hidden md:block w-1/2 h-full bg-black">
        <div className="h-full w-full grid place-items-center">
          <div>
          <img src="./src/assets/SixSenseMobility.png" alt="SixSenseMobility" />
          </div>
        </div>
      </div>

      {/* right side singup section */}
      <section className="md:bg-gray-50 dark:bg-gray-900 w-full md:w-1/2 bg-black text-white h-full">
        <h3 className="text-center text-3xl font-semibold mt-20 md:hidden">
          Six Sense Mobility
        </h3>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 mt-10 md:mt-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Enter email
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                {/* email address  */}
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email address
                  </label>
                </div>
                <button type="submit" className="w-full btn">
                <p ref={buttonRef} className="btn-name">Next</p>
                  <p ref={spinnerRef} className="btn-spinner hidden">
                    <ButtonSpinner />
                  </p>
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account ?{" "}
                  <Link
                    to={"/login"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
