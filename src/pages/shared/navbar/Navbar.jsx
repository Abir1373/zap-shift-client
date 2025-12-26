import React from "react";
import { Link, NavLink } from "react-router";
import ProfastLogo from "../profastlogo/ProfastLogo";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const navItems = (
    <>
      <li className="hover:bg-primary text-base hover:text-black">
        <NavLink to="/"> Home </NavLink>
      </li>
      <li className="hover:bg-primary text-base hover:text-black">
        <NavLink to="/about"> About Us </NavLink>
      </li>
      <li className="hover:bg-primary text-base hover:text-black">
        <NavLink to="/coverage"> Coverage </NavLink>
      </li>

      {user && (
        <li className="hover:bg-primary text-base hover:text-black">
          <NavLink to="/dashboard"> Dashboard </NavLink>
        </li>
      )}
      <li className="hover:bg-primary text-base hover:text-black">
        <NavLink to="/beARider"> Be a Rider </NavLink>
      </li>
      <li className="hover:bg-primary text-base hover:text-black">
        <NavLink to="/sendparcel"> Send Parcel </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm text-base">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-4"
          >
            {navItems}
          </ul>
        </div>
        <span className="btn btn-ghost text-xl">
          <ProfastLogo></ProfastLogo>
        </span>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button className="btn btn-primary text-black" onClick={handleLogOut}>
            Log Out
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary text-black text-base">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
