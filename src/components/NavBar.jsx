import React, { useState } from "react";
import { useUser, useClerk, useSignIn, UserButton } from "@clerk/clerk-react";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Navbars = () => {
  const { isSignedIn } = useUser();
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const toggleDarkMode = () => {
    const root = document.getElementById("root");
    if (darkModeEnabled) {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
    setDarkModeEnabled(!darkModeEnabled);
  };

  return (
    <nav className="bg-gray-900 dark:bg-gray-100">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to={'/dashboard'}>
          <img
            width={50}
            height={50}
            src="https://i.ibb.co/VDBXghV/musique-min.png"
            alt=""
          />
        </Link>
        <div className="space-x-6 flex flex-row items-center gap-2 justify-center">
          <a
            href="/dashboard"
            className="text-white dark:text-gray-800 hover:text-gray-300 transition duration-300 ease-in-out"
          >
            Dashboard
          </a>
          <a
            href="/contact"
            className="text-white dark:text-gray-800 hover:text-gray-300 transition duration-300 ease-in-out"
          >
            Contacts
          </a>

          {isSignedIn ? (
            <UserButton />
          ) : (
            <a
              href="https://accounts.audiotofiles.com/sign-in"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign in
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbars;
