import { useState, useEffect } from "react";
import axiosInstance from "../axiosCalls/axios";
import AuthContext from "./authContext";

export const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    axiosInstance
      .get("/customers/me", { signal: controller.signal })
      .then((response) => {
        setCustomer(response.data.customer);
      })
      .catch((error) => {
        if (error.name !== "CanceledError" && error.code !== "ERR_CANCELED") {
          setCustomer(null);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoader(false);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <AuthContext.Provider value={{ customer, setCustomer, loader, setLoader }}>
      {children}
    </AuthContext.Provider>
  );
};
