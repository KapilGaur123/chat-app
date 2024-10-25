import React, { useState } from "react";
import axios from "axios"
import { useAuth } from "../context/authProvider";
import { Link } from "react-router-dom";

function Signin() {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errShow, setErrShow] = useState({});
  const [runApi, setRunApi] = useState(false);

  const [authUser, setAuthUser] = useAuth();

  const handleChange = (event) => {
    setUser({...user, [event.target.name] : event.target.value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrObj = {};

    if (user.fullname === "") {
      newErrObj.fullname = "enter the username";
    }
    if(user.email === ""){
      newErrObj.email = "enter the email";
    }
    if(user.password === ""){
      newErrObj.password = "enter the password";
    }
    if(user.confirmPassword === ""){
      newErrObj.confirmPassword = "re-enter the password";

    }else if(user.confirmPassword !== user.password){
      newErrObj.confirmPassword = "comfirm password is not match";
    }else{
      setRunApi(true);
    }

    setErrShow(newErrObj);

    if(runApi){
      const userInfo = {
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword
      }

      await axios.post("http://localhost:3000/user/signin", userInfo, {
        withCredentials: true
      })
      .then((response) => {
        // console.log(response.data.createdUser);
        alert("success!!!")
        localStorage.setItem("ChatApp",JSON.stringify(response.data))
        setAuthUser(response.data)
      })
      .catch( (error) => {
        console.log(error);
        if(error.status === 405){
          alert("user exist already!")
        }
      } )
    }

  };

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-[#0F172A]">
        <form
          action=""
          className="border border-white px-6 py-2 rounded-md space-y-3 w-96"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl text-center">
            Chat<span className="text-green-500 ml-1">App</span>
          </h1>
          <h2 className="text-xl text-white font-bold">Signup</h2>
          <div className="border border-white rounded-md">
            <label className="input input-bordered flex items-center gap-2 text-gray-400 bg-[#0F172A]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="username"
                name="fullname"
                onChange={handleChange}
                value={user.fullname}
              />
            </label>
          </div>
          <span className="text-red-600">{errShow.username}</span>
          <div className="border border-white rounded-md">
            <label className="input input-bordered flex items-center gap-2 text-gray-400 bg-[#0F172A]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="email"
                name="email"
                onChange={handleChange}
                value={user.email}
              />
            </label>
          </div>
          <span className="text-red-600">{errShow.email}</span>
          <div className="border border-white rounded-md">
            <label className="input input-bordered flex items-center gap-2 text-gray-400 bg-[#0F172A]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="password"
                name="password"
                onChange={handleChange}
                value={user.password}
              />
            </label>
          </div>
          <span className="text-red-600">{errShow.password}</span>
          <div className="border border-white rounded-md">
            <label className="input input-bordered flex items-center gap-2 text-gray-400 bg-[#0F172A]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="confirm-password"
                name="confirmPassword"
                onChange={handleChange}
                value={user.confirmPassword}
              />
            </label>
          </div>
          <span className="text-red-600">{errShow.confirmPassword}</span>
          <div className="flex justify-between">
            <p>
              have an acount?{" "}
              <Link to="/login" className="text-blue-600 cursor-pointer underline">
                Login
              </Link>
            </p>
            <input
              type="submit"
              value="Submit"
              className="text-while bg-green-500 px-2 py-1 rounded-lg cursor-pointer"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Signin;
