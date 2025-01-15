import React from "react";

import UseAuth from "../../Hookos/UseAuth";
import useAxiosSecure from "../../Hookos/useAxiosSecure";

import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import useCart from "../../Hookos/useCart";
import Swal from "sweetalert2";


const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const {user} = UseAuth()

  const totalPrice = cart.reduce((total,item)=>total + item.unit_price,0)

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          refetch()
          }
        });
      }
    });
  };


  const handleClearCart = async () => {
    try {
      await axiosSecure.delete(`/carts/clear/${user.email}`);
      refetch(); // Refresh the cart
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };






  return (
    <div>
      <div className="flex gap-4 items-center justify-center my-8">
        <h2 className="text-xl">Total Order: {cart.length}</h2>
        <h2 className="text-xl">Total Price: ${totalPrice.toFixed(2)}</h2>
        <button 
        onClick={handleClearCart}
        className=" px-2 py-2 bg-red-200 hover:bg-red-300 text-red-500 text-[11px] rounded-full">Clear Cart</button>
        {cart.length ? (
          <Link to="/dashboard/payment">
            <button className=" px-2 py-1 bg-green-200 hover:bg-green-300 text-green-500 rounded-full">Pay</button>

          </Link>
          
        ) : (
          <button disabled className="btn btn-primary">
            Pay
          </button>
        )}
      </div>


        {/* table */}

        <div className="w-full min-h-screen">
    <table className="table-auto w-full border border-gray-200">
      <thead>
        <tr>
          <th className="px-1 py-1 text-center text-xs font-semibold border border-gray-200">
            No:
          </th>
          <th className="px-1 py-1 text-center text-xs font-semibold border border-gray-200">
            Photo
          </th>
          <th className="px-1 py-1 text-center text-xs font-semibold border border-gray-200">
            Item Name
          </th>
          <th className="px-1 py-1 text-center text-xs font-semibold border border-gray-200">
            Company Name
          </th>
          <th className="px-0 py-1 text-center text-xs font-semibold border border-gray-200">
            Price
          </th>
          <th className="px-0 py-1 text-center text-xs font-semibold border border-gray-200">
            Quantity
          </th>
          <th className="px-1 py-1 text-center text-xs font-semibold border border-gray-200">
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        {cart && cart.length > 0 ? (
          cart.map((item, index) => (
            
            <tr key={item._id}>
              <td className="px-0 py-1 text-xs border border-gray-200 text-center">
                {index + 1}
              </td>
              <td className="px-0 py-1 border border-gray-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-5 h-5 rounded-full object-cover mx-auto"
                />
              </td>
              <td className="px-1 py-1 text-xs border text-center border-gray-200 break-words">
                {item.name}
              </td>
              <td className="px-1 py-1 text-xs border border-gray-200 text-center">
                
                {item.company}
              </td>
              <td className="px-0 py-1 text-xs border text-center border-gray-200 break-words">
                ${item.unit_price}
              </td>
              <td className="px-0 py-1 text-xs border text-center border-gray-200 break-words">
                quantity
              </td>
              <td className="px-1 py-1 text-xs border border-gray-200">
                <div className="flex justify-center">
                <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-lg  text-red-400"
                  >
                    <FaTrash></FaTrash>
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center text-red-500 py-4">
              No Medicine Added By {user.displayName}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>



    </div>
  );
};



  
  export default Cart;
  






