import React, { useEffect, useState } from "react";
import axios from "axios";
import cookies from "js-cookie";

const GetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);

      try {

        const token = cookies.get("token");
        const response = await axios.get(
          "http://localhost:3000/user/AllUsers",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllUsers(response.data);

        setLoading(false);
      } catch (error) {
        console.log("GetAllUsers error : " + error);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading]
};

export default GetAllUsers;
