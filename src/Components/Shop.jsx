import React, { useState } from 'react';
import useMedicineCategory from '../Hookos/useMedicineCategory';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import UseAuth from '../Hookos/UseAuth';
import Swal from 'sweetalert2';

import useAxiosSecure from '../Hookos/useAxiosSecure';
import useCart from '../Hookos/useCart';

const Shop = () => {
    const [categories] = useMedicineCategory()
    const location = useLocation()
    const navigate = useNavigate()
    const {user} = UseAuth()
    const [,refetch] = useCart()
    const axiosSecure = useAxiosSecure()
    
          const [selectedItem, setSelectedItem] = useState(null); // To store the selected item
          const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
        
          const openModal = (item) => {
            setSelectedItem(item); // Set the selected item for the modal
            setIsModalOpen(true); // Open the modal
          };
        
          const closeModal = () => {
            setSelectedItem(null); // Clear the selected item
            setIsModalOpen(false); // Close the modal
          };
        
          const handleAddToCart = item =>{
            const {name,generic_name,category,company,unit,image,unit_price,discount,description,_id} = item
           if(user && user.email){
            
            const cartItem = {
                medicineId : _id,
                email:user.email,
                name,
                image,
                unit_price,
                discount,
                company,
                unit

            }

            axiosSecure.post('/carts',cartItem)
            .then(res=>{
                // console.log(res.data)
          if(res.data.insertedId){
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${name} has been saved to cart`,
              showConfirmButton: false,
              timer: 1500
            });
            // refetch cart to update the cart items count
           refetch()
          }
            })

           }
           else{
            Swal.fire({
                title: "You are not logged in",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login"
              }).then((result) => {
                if (result.isConfirmed) {
                // send the user to the login page
                navigate("/login", { state: { from: location } });
               
                }
              });                                                                   
           }
          }





    return (
        <div className="flex flex-col gap-4 justify-center items-center mt-6 p-3">
        <Helmet>
          <title>Shop||Medica</title>
        </Helmet>
  <h2 className="text-3xl text-center mb-3">All Medicines</h2>
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
            Generic Name
          </th>
          <th className="px-0 py-1 text-center text-xs font-semibold border border-gray-200">
            Price
          </th>
          <th className="px-0 py-1 text-center text-xs font-semibold border border-gray-200">
            Details
          </th>
          <th className="px-1 py-1 text-center text-xs font-semibold border border-gray-200">
            Order
          </th>
        </tr>
      </thead>
      <tbody>
        {categories && categories.length > 0 ? (
          categories.map((item, index) => (
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
                {item.generic_name}
              </td>
              <td className="px-0 py-1 text-xs border text-center border-gray-200 break-words">
                ${item.unit_price}
              </td>
              <td className="px-0 py-1 text-xs border text-center border-gray-200 break-words">
                <Link>
                  <button onClick={() => openModal(item)}>
                    <MdOutlineRemoveRedEye size={20}  />
                  </button>
                </Link>
              </td>
              <td className="px-1 py-1 text-xs border border-gray-200">
                <div className="flex justify-center">
                  <button 
                  onClick={()=>handleAddToCart(item)}
                  className="lg:btn lg:bg-green-200 btn-xxs hover:bg-green-200 bg-green-100 lg:text-green-500 text-[10px]">
                    Select
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center text-red-500 py-4">
              No Medicine
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* Modal */}
  {isModalOpen && (
    <Modal item={selectedItem} onClose={closeModal} />
  )}
</div>
    );
};

export default Shop;