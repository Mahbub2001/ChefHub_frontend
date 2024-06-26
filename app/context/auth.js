"use client";

import React, { useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    // const storedUser = localStorage.getItem("user_id");
    // const storedUser_token = localStorage.getItem("token");
    const storedUser_token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;

    
    if (storedUser && storedUser_token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user_id");
      }
    }
  }, []);
  

  const signin = async (email, password) => {
    let data;
    try {
      const res = await fetch("https://chefhub-backend.onrender.com/chef/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        console.log(res);
        data = await res.json();
        if(data.error){
           toast.error(data.error);
           return;
        }
        // console.log(data);
        toast.success("Successfully login!")
        setUser(data.user_id);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
        router.push("/profile", { scroll: false });
        return { success: true };
      } else {
        const errorData = await res.json();
        return { success: false, error: errorData.error || "Login failed" };
      }
    } catch (error) {
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setUser(null);
    const res = await fetch(
      "https://chefhub-backend.onrender.com/chef/logout/",
      {
        method: "POST",
      }
    );
    router.push("/login", { scroll: false });
  };

  const authInfo = {
    user,
    // loading,
    // registerUser,
    signin,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
