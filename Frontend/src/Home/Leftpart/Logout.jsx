import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios"
import cookies from "js-cookie"

function Logout() {
  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:3000/user/logout");
      localStorage.removeItem("ChatApp")
      cookies.remove("token")
      alert("Logout Sucessfully")
      window.location.reload();

    } catch (error) {
      console.log("error in logout section "+ error);
      
    }
  }

  return (
    <>
      <div className="h-[10vh] fixed bottom-0 left-0 right-0">
        <BiLogOutCircle className="text-5xl text-white p-2 hover:bg-slate-700 duration-300 cursor-pointer rounded-full mt-2 ml-2" onClick={handleLogout} />
      </div>
    </>
  );
}

export default Logout;
