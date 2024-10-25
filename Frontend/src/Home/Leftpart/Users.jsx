import React from "react";
import User from "./User";
import GetAllUsers from "../../context/GetAllUsers";

function Users() {
  const [allUsers, loading] = GetAllUsers();

  // console.log(allUsers);
  
  return (
    <>
      <div>
        <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
          Messages
        </h1>
        <div
          className="py-2 scroll-container"
          style={{ maxHeight: "calc(91vh - 20vh)" }}
        >
          {
            allUsers.map((user, index) => (
              <User key={index}  user={user}/>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Users;
