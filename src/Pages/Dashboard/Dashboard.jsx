import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../../Hookos/useCart";
import { FiShoppingCart } from "react-icons/fi";
import { FaCalendar, FaHome } from "react-icons/fa";
import { MdOutlinePayments, MdOutlineRateReview, MdOutlineReport } from "react-icons/md";

import { FaShop } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { RiAdvertisementLine } from "react-icons/ri";

const Dashboard = () => {
  const [cart] = useCart();
  const isAdmin = true;
  
  return (
    <div className="flex flex-col lg:flex-row ">

      {/* dashboard side bar */}
      <div className="w-full lg:w-64  h-full lg:min-h-screen bg-gray-200 ">

        <h2 className="text-center mt-5">Medica Pharma</h2>

        <ul className="menu ">

        {
            isAdmin ? 

            <>
             {/* Seller dashboard */}
          <li>
            <NavLink to="/dashboard/userHome">
              <FaHome></FaHome>Admin Home
            </NavLink>
          </li>

         
          <li>
            <NavLink to="/dashboard/users">
              <MdOutlineRateReview></MdOutlineRateReview> Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageMedicine">
            <GiMedicines></GiMedicines> Manage Category
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/advertise">
            <MdOutlinePayments></MdOutlinePayments> Payment management
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentHistory">
              <MdOutlineReport></MdOutlineReport> Sales Report
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/paymentHistory">
            <RiAdvertisementLine></RiAdvertisementLine> Manage banner Advertise
            </NavLink>
          </li>
            </> 
            
            : 
            
            
            <>
             {/* Seller dashboard */}
          <li>
            <NavLink to="/dashboard/userHome">
              <FaHome></FaHome> Seller Home
            </NavLink>
          </li>

         
          {/* <li>
            <NavLink to="/dashboard/review">
              <MdOutlineRateReview></MdOutlineRateReview> Review
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/dashboard/manageMedicine">
            <GiMedicines></GiMedicines> Manage Medicines
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/advertise">
            <RiAdvertisementLine></RiAdvertisementLine> Ask For Advertisement
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentHistory">
              <MdOutlinePayments></MdOutlinePayments> Payment History
            </NavLink>
          </li>
            </>
        }


         

          {/* user Dashboard */}
          <li>
            <NavLink to="/dashboard/history">
            <MdOutlinePayments></MdOutlinePayments>   Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myCart">
              <FiShoppingCart></FiShoppingCart> My Cart ({cart.length})
            </NavLink>
          </li>


          {/* Shared nav links */}

          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop">
              <FaShop></FaShop> Shop
            </NavLink>
          </li>
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
