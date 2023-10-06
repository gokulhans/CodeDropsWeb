import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";

function Navbar({ isAuth, setIsAuth }) {
  let navigate = useNavigate();
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/");
      // window.location.pathname = "/login";
    });
  };

  return (
    <nav className="bg-green-50 bg-opacity-50 shadow-md border-green-200 px-5 fixed top-0 w-full h-16 flex justify-self-center sm:px-4 z-50">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to={"/"} className="flex items-center">
          {/* <img src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/> */}
          <span className="self-center text-2xl font-bold text-black">
            <b>Code Drops</b>
          </span>
        </Link>
        <div className="flex items-center">
          {isAuth && (
            <div className="flex">
              <Link
                to={"/add"}
                className="bg-green-500 hover:bg-green-700 font-bold text-green-100 py-2 px-4 rounded-full"
              >
                Add Drop
              </Link>
              <button
                onClick={signUserOut}
                className="ml-2 bg-green-500 hover:bg-green-700 font-bold text-green-100 py-2 px-4 rounded-full"
              >
                Logout
              </button>
              <Link
                to={"/myprofile"}
                className="ml-2 bg-green-500 hover:bg-green-700 font-bold text-green-100 py-2 px-4 rounded-full"
              >
                {localStorage.getItem("authorname")}
              </Link>
              <a
                href="https://github.com/gokulhans/CodeDrops"
                target="_blank"
                className="ml-2 bg-green-50 rounded-full cursor-pointer"
              >
                <img
                  width="40"
                  height="40"
                  src="https://img.icons8.com/ios-filled/50/000000/github.png"
                  alt="github"
                />
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
