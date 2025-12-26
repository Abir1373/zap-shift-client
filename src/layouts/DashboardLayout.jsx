import React from "react";
import { NavLink, Outlet } from "react-router";
import ProfastLogo from "../pages/shared/profastlogo/ProfastLogo";

import { AiFillHome } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { BiCreditCard, BiSearchAlt } from "react-icons/bi";
import { FaTasks, FaWallet } from "react-icons/fa";
import {
  FaUserClock,
  FaUserCheck,
  FaUserShield,
  FaUserPlus,
} from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";
import { MdOutlineIncompleteCircle } from "react-icons/md";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  return (
    <div className="m-5 drawer lg:drawer-open" data-aos="fade-right">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Page content here */}
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ProfastLogo></ProfastLogo>
        <ul className="menu">
          <li>
            <NavLink to="/dashboard">
              <AiFillHome className="text-xl" />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/myParcels">
              <BsBoxSeam className="text-xl" />
              My Parcels
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/paymentHistory">
              <BiCreditCard className="text-xl" />
              Payment History
            </NavLink>
          </li>

          {/* rider links  */}

          {!roleLoading && role === "rider" && (
            <>
              <li>
                <NavLink to="/dashboard/pending_deliveries">
                  <FaTasks className="inline-block mr-2" />
                  Pending Deliveries
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/completed_deliveries">
                  <MdOutlineIncompleteCircle className="inline-block mr-2" />
                  Completed Deliveries
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my_earnings">
                  <FaWallet className="inline-block mr-2" />
                  My Earnings
                </NavLink>
              </li>
            </>
          )}

          {/* admin links  */}

          {!roleLoading && role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/activeRiders">
                  <FaUserCheck className="text-xl" />
                  Active Riders
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/assign-rider">
                  <FaUserPlus className="text-xl" />
                  Assign Rider
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/pendingRiders">
                  <FaUserClock className="text-xl" />
                  Pending Riders
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/makeAdmin">
                  <FaUserShield className="text-xl" />
                  Make Admin
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
