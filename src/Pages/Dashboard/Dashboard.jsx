import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../../Hookos/useCart";
import { FiShoppingCart } from "react-icons/fi";
import { FaCalendar, FaHome, FaUsers } from "react-icons/fa";
import {
  MdCategory,
  MdOutlinePayments,
  MdOutlineRateReview,
  MdOutlineReport,
} from "react-icons/md";

import { FaShop } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { RiAdvertisementLine } from "react-icons/ri";
import useAdmin from "../../Hookos/useAdmin";
import useSeller from "../../Hookos/useSeller";
import "./Dashboard.css";
const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();

  return (
    <div className="flex flex-col lg:flex-row ">
      {/* dashboard side bar */}
      <div className="w-full lg:w-64  h-full lg:min-h-screen bg-gray-200 ">

        <div className="flex flex-col justify-center items-center rounded-full mt-5 gap-2">
          <img className="w-10" src='/medica-logo.avif' alt="" />
          <h2 className="text-center mt-5">Medica Pharma</h2>
        </div>

        <ul className="menu">
          {/* Admin Dashboard */}
          {isAdmin && (
            <>
              <li>
                <NavLink
                to='/dashboard/adminHome'
                >
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageCategory">
                <MdCategory /> Manage Category
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentManagement">
                  <MdOutlinePayments /> Payment Management
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/report">
                  <MdOutlineReport /> Sales Report
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageAdvertise">
                  <RiAdvertisementLine /> Manage Banner Advertise
                </NavLink>
              </li>

              <div className="divider"></div>
              <li>
                <NavLink to="/">
                  <FaHome /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop">
                  <FaShop /> Shop
                </NavLink>
              </li>
            </>
          )}

          {/* Seller Dashboard */}
          {isSeller && (
            <>
              <li>
                <NavLink to="/dashboard/sellerHome">
                  <FaHome /> Seller Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageMedicine">
                  <GiMedicines /> Manage Medicines
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/askForAdvertise">
                  <RiAdvertisementLine /> Ask For Advertisement
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/sellerPaymentHistory">
                  <MdOutlinePayments /> Payment History
                </NavLink>
              </li>

              <div className="divider"></div>
              <li>
                <NavLink to="/">
                  <FaHome /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop">
                  <FaShop /> Shop
                </NavLink>
              </li>
            </>
          )}

          {/* User Dashboard */}
          {!isAdmin && !isSeller && (
            <>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <MdOutlinePayments /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myCart">
                  <FiShoppingCart /> My Cart ({cart.length})
                </NavLink>
              </li>

              <div className="divider"></div>
              <li>
                <NavLink to="/">
                  <FaHome /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop">
                  <FaShop /> Shop
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* dashboard content */}
      <div className="flex flex-col lg:flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
