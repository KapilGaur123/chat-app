import React from "react";
import Left from "./Home/Leftpart/Left";
import Right from "./Home/Rightpart/Right";
import Signin from "./components/Signin";
import Login from "./components/Login";
import { useAuth } from "./context/authProvider";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";

function App() {
  const [authUser, setAuthUser] = useAuth();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen">
                <Left />
                <Right />
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signin"
          element={authUser ? <Navigate to={"/"} /> : <Signin />}
        />
      </Routes>
    </>
  );
}

export default App;
