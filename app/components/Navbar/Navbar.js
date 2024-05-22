"use client";

import React, { useContext, useState } from "react";
import "./Navbar.css";
import Link from "next/link";
import { AuthContext } from "@/app/context/auth";

const Navbar = () => {
  const [isopen, setIsopen] = useState(false);

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="home">
      <div className="w-full h-full">
        <div className="Navbar shadow-2xl bg-black">
          <div className="flex items-center justify-center gap-2">
            {/* <img className="w-28 h-28" src={logo} alt="" /> */}
            <div className="flex flex-col gap-1">
              <font className="school-name font-bold">ChefHub</font>
            </div>
          </div>
          <div className={`nav-items ${isopen && "open"}`}>
            <Link href="/" className="">
              Home
            </Link>
            <Link href="/about_us" className="">
              About us
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="">
                  Profile
                </Link>
                <Link href="/my_recipe" className="">
                  My Recipe
                </Link>
                <Link href="/add_recipe" className="">
                  Add Recipe
                </Link>
                <Link href="/my_event" className="">
                  My Event
                </Link>
                <Link href="/add_event" className="">
                  Add Event
                </Link>
                <button onClick={handleLogout}>Log out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="">
                  Login
                </Link>
                <Link href="/registration" className="">
                  Registration
                </Link>
              </>
            )}
          </div>
          <div
            className={`nav-toggle ${isopen && "open"}`}
            onClick={() => setIsopen(!isopen)}
          >
            <div className="bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
