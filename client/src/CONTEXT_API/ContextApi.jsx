// ContextApi.js

import React, { useEffect, useState } from "react";
import Api from "../Api/axios";
import { Outlet } from "react-router";

export const Context = React.createContext();

const ContextApi = ({ children }) => {
  const [user, setUser] = useState(null);
  const [persist, setPersist] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await Api.get("/USER/GET");
        setPersist(true);
        setUser(data);
      } catch (err) {
        console.error(err.message);
        console.error(err.response?.status); // Check if response exists before accessing status
        setPersist(true);
      }
    };

    fetchUserData();
  }, []); // Add dependencies if needed
  console.log(user);
  return (
    <Context.Provider
      value={{
        user,
        setUser,
        persist,
        setPersist,
      }}
    >
      <Outlet></Outlet>
      {children}
    </Context.Provider>
  );
};

export default ContextApi;
