import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UseAuth from '../Hookos/UseAuth';
import useCart from '../Hookos/useCart';
import useAxiosSecure from '../Hookos/useAxiosSecure';

const Card = ({item}) => {

  const navigate = useNavigate()
  const {user} = UseAuth()
  const [,refetch] = useCart()
  const axiosSecure = useAxiosSecure()

  
  
  const handleAddToCart = item =>{
    const {name,generic_name,category,company,image,unit_price,discount,description,_id,unit} = item
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
        navigate("/login");
       
        }
      });                                                                   
   }
  }



    return (
        <div className="card bg-base-100 w-96 h-[500px] shadow-xl">
  <figure className="px-10 pt-10">
    <img
    className="w-full h-52 object-cover rounded-xl"
      src={item.image}
      alt="item"
      />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{item.name} </h2>
    
        <p className=" pt-1"><span className="font-medium">Unit Price :</span> ${item.unit_price}</p>
        <p className=" pt-1"><span className="font-medium">Discount Price :</span> ${item.discount}</p>
    <div className="card-actions">
      <button  onClick={()=>handleAddToCart(item)} className="btn btn-xs hover:bg-green-200 bg-green-100 text-green-500">Add To Cart</button>
    </div>
  </div>
</div>
    );
};

export default Card;