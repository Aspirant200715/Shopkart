import { useState, useEffect } from "react";
import axiosInstance from "../axiosCalls/axios";
import AuthContext from "./authContext";

export const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/customers/me")
      .then((response) => {
        setCustomer(response.data.customer);
      })
      .catch(() => setCustomer(null))
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ customer, setCustomer, loader, setLoader }}>
      {children}
    </AuthContext.Provider>
  );
};
