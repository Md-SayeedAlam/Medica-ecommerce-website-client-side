import React from "react";
import { Link, NavLink } from "react-router-dom";
import UseAuth from "../../Hookos/UseAuth";
import toast from "react-hot-toast";
import useCart from "../../Hookos/useCart";

const Navbar = () => {
const [cart] = useCart()
const totalPrice = cart.reduce((total,item)=>total + item.unit_price,0)
const {user,logOut} = UseAuth()
const handleLogOut = () => {
  logOut()
    .then(() => {
      // console.log("logged out");
      toast.success('Logout successful' ,{position: "top-center",
        autoClose: 2000,})
    })
    .catch((error) => {
      // console.log("ERROR",error);
      toast.error('Logout failed' ,{position: "top-center",
        autoClose: 2000,})
    });
};

  const list = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-green-200 text-green-500" : "text-black bg-gray-300"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to='/shop'
          className={({ isActive }) =>
            isActive ? "bg-green-200 text-green-500 " : "text-black bg-gray-300"
          }
        >
          Shop
        </NavLink>
      </li>

      <li>
        <NavLink  className={({ isActive }) =>
            isActive ? "bg-green-200 text-green-500 " : "text-black bg-gray-300"
          }>
           {/* language dropdown */}

    <div className="dropdown dropdown-right">
        <div tabIndex={0} role="button" className="">Language</div>
        <ul
          tabIndex={0}
          className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
          <li>বাংলা</li>
          <li>English</li>
        </ul>
      </div>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-200  sticky top-0 z-10">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-1"
          >
            {list}
          </ul>
        </div>
        <img className="w-8 lg:w-10 rounded-full" src="/medica-logo.avif" alt="medica" />
        <a className="btn btn-ghost text-xl hover:bg-green-200  lg:text-green-500">Medica</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">{list}</ul>
      </div>

   
    



    {
      user ? 
      <>
       {/* Cart and User logo */}

       <div className="navbar-end">
       <div className="flex justify-center items-center">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">{cart.length}</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">{cart.length} Items</span>
              <span className="text-info">Total Price : ${totalPrice}</span>
              <div className="card-actions">
               <Link to='/dashboard/myCart' > <button className="btn  bg-green-200 btn-block">View cart</button></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="user Photo"
                src={user.photoURL}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link className="justify-between">
               Update Profile
                {/* <span className="badge">New</span> */}
              </Link>
            </li>
            <li>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogOut}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
       </div>
      
       </>
      
      : 
      
      <>  
      <div className="navbar-end">
      <Link to='/login' className="btn border-green-500 hover:bg-green-200 bg-green-100 text-green-500 rounded-full">
        Join Us
      </Link>
    </div> 
    </>
    }

     
    </div>
  );
};

export default Navbar;
