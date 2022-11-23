import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import axios from "axios";
import ToastContainer from "../common/ToastContainer";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const Login = () => {
  const navigate = useNavigate();

  // for Google-Login

  const clientId =
    "1008337891871-2gv10molbqtov3grukis2rk1ehbi11m4.apps.googleusercontent.com";

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });
  const onSuccess = (res) => {
    setProfile(res.profileObj);
    localStorage.setItem("user", JSON.stringify(res.profileObj));
    setTimeout(() => {
      toast.success("login successfully!");
    }, 500);
    navigate("/devices");
  };
  const onFailure = (err) => {
    toast.error("an error occured! try other ways to login.");
  };

  // for email login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await axios.get(
      "https://six-sense-mobility-iot.vercel.app/api/users"
    );

    let user = res.data.find((ele) => ele.email === email);

    if (!user) {
      return toast.error("user doesn't exists.");
    }
    let enc_password = user.password;
    var dec_password = CryptoJS.AES.decrypt(
      enc_password,
      "SixSenseMobility"
    ).toString(CryptoJS.enc.Utf8);
    if (password != dec_password) {
      return toast.error("wrong credentials.");
    }
    localStorage.setItem("user", JSON.stringify(user));
    setTimeout(() => {
      toast.success("login successfully!");
    }, 500);
    return navigate("/devices");
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      return navigate("/");
    }
  }, []);

  return (
    <div className="w-full h-[100vh] flex flex-col md:flex-row justify-evenly items-center">
      <ToastContainer />
      <div className="hidden md:block w-1/2 h-full bg-black">
        <div className="h-full w-full grid place-items-center">
          <div>
            <h1 className="text-white text-5xl">Six Sense Mobility</h1>
            <p className="text-gray-400 text-right mt-1 mr-1">
              company tagline here
            </p>
          </div>
        </div>
      </div>

      {/* right side login section */}
      <section className="md:bg-gray-50 dark:bg-gray-900 w-full md:w-1/2 bg-black text-white h-full">
        <h3 className="text-center text-3xl font-semibold mt-20 md:hidden">
          Six Sense Mobility
        </h3>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 mt-10 md:mt-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
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
                {/* password  */}
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="floating_password"
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
                </div>
                {/* remember me & forget password  */}
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input type="checkbox" className="checkbox" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    to={"/forgot"}
                    className="text-sm font-medium text-gray-800 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                {/* sing in button  */}
                <button type="submit" className="w-full btn">
                  Sign in
                </button>
                {/* google login button  */}
                <GoogleLogin
                  className="w-full"
                  clientId={clientId}
                  buttonText="Sign in with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to={"/singup"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
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

export default Login;
