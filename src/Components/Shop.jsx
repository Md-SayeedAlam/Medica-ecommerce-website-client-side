import React, { useEffect, useState } from 'react';
import useMedicineCategory from '../Hookos/useMedicineCategory';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import UseAuth from '../Hookos/UseAuth';
import Swal from 'sweetalert2';

import useAxiosSecure from '../Hookos/useAxiosSecure';
import useCart from '../Hookos/useCart';
import useAxiosPublic from '../Hookos/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';


const Shop = () => {
    // const [categories] = useMedicineCategory()

    const location = useLocation()
    const navigate = useNavigate()
    const {user,loading} = UseAuth()
    const [,refetch] = useCart()
    const axiosSecure = useAxiosSecure()

    const axiosPublic = useAxiosPublic()

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
  
 const [categories,setCategories] = useState([])

 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


    // const {data:categories=[],isLoading}=useQuery({
    //     queryKey:['categories',{search,sort}],
      
    //     queryFn: async ()=>{
    //         const res = await axiosPublic.get(`/medicine/search/sort?search=${search}&sort=${sort}`)
            
    //         return res.data
            
    //     },
        
    
    // })

    useEffect(() => {
      const foodsItem = async () => {
        try {
          const response = await fetch(
            `https://medica-server-side.vercel.app/medicine/search/sort?search=${search}&sort=${sort}`,{withCredentials:true},
            {
              method: "GET",
              headers: {
                "content-type": "application/json",
              },
            }
          );
          
          const data = await response.json();
          setCategories(data);
        } catch (error) {
          // console.log("Error fetching foods:", error);
        }
      };
  
      foodsItem();
    }, [search, sort]);




    const totalItems = categories.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = categories.slice(startIndex, endIndex);



   
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
                unit,
                quantity: 1,

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


if(loading) return <Loading></Loading>


    return (
        <div className="flex flex-col gap-4 justify-center items-center mt-6 p-3 container mx-auto">
        <Helmet>
          <title>Shop||Medica</title>
        </Helmet>
  <h2 className="text-3xl text-center mb-3">All Medicines</h2>



  <div className="flex flex-col lg:flex-row gap-5 mt-10 mb-10  lg:mx-10 ">
        <div className="w-full lg:w-1/2">
          <label className="input input-bordered flex items-center gap-2">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="grow"
              placeholder="Search Here By Foods Name"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>

            {/* <button  className="px-2 py-1 rounded-md bg-amber-400">Search</button> */}

        




          </label>
        </div>

        <div className="w-full lg:w-1/2">
          <select
          defaultValue={'Sort By Price'}
          onChange={(e) => setSort(e.target.value)}
            name="category"
            id="category"
            className="border p-[11px] rounded-md pr-[148px] lg:pr-[250px]"
          >
            <option  value="">Sort By Price</option>
            <option value="dsc">Descending Order</option>
            <option value="asc">Ascending Order</option>
          </select>
        </div>
      </div>










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
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <tr key={item._id}>
              <td className="px-0 py-1 text-xs border border-gray-200 text-center">
                {startIndex+index + 1}
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




    <div className="flex justify-center mt-5">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="btn btn-sm bg-sky-400 text-white"
          >
            Previous
          </button>
          <span className="mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="btn btn-sm bg-green-400 text-white "
          >
            Next
          </button>
        </div>








  </div>

  {/* Modal */}
  {isModalOpen && (
    <Modal item={selectedItem} onClose={closeModal} />
  )}
</div>
    );
};

export default Shop;