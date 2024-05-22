"use client";

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { user, logout,signin } = useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signin(formData.email, formData.password);
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Login failed");
        return;
      }
      console.log("Login successful!");
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error("An error occurred:", error);
    }
  };
  

  return (
    <div>
      <h2 className="text-center mt-5 text-[20px] mb-5">Login</h2>
      {error && <p className="text-center text-red-600">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
