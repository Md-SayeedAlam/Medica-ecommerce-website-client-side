import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../../Hookos/useCart";
import { FiShoppingCart } from "react-icons/fi";
import { FaCalendar, FaHome } from "react-icons/fa";
import { MdOutlinePayments, MdOutlineRateReview, MdOutlineReport } from "react-icons/md";

import { FaShop } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { RiAdvertisementLine } from "react-icons/ri";
import useAdmin from "../../Hookos/useAdmin";
import useSeller from "../../Hookos/useSeller";

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();
  
  return (
    <div className="flex flex-col lg:flex-row ">

      {/* dashboard side bar */}
      <div className="w-full lg:w-64  h-full lg:min-h-screen bg-gray-200 ">

        <h2 className="text-center mt-5">Medica Pharma</h2>

        <ul className="menu">
  {/* Admin Dashboard */}
  {isAdmin && (
    <>
      <li>
        <NavLink to="/dashboard/userHome">
          <FaHome /> Admin Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/users">
          <MdOutlineRateReview /> Manage Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manageCategory">
          <GiMedicines /> Manage Category
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/advertise">
          <MdOutlinePayments /> Payment Management
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/paymentHistory">
          <MdOutlineReport /> Sales Report
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/bannerAdvertise">
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
        <NavLink to="/dashboard/userHome">
          <FaHome /> Seller Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manageMedicine">
          <GiMedicines /> Manage Medicines
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/advertise">
          <RiAdvertisementLine /> Ask For Advertisement
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/paymentHistory">
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
        <NavLink to="/dashboard/history">
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
