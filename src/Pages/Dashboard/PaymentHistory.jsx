import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hookos/useAxiosSecure';
import UseAuth from '../../Hookos/UseAuth';
import useCart from '../../Hookos/useCart';

const PaymentHistory = () => {


    const { user } = UseAuth();
    const [cart] = useCart()
    const axiosSecure = useAxiosSecure();


    
    
    const { data: users = [],isLoading} = useQuery({
      queryKey: ["users"],
      
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/users/api/${user?.email}`
  
        );
        return res.data;
      },
    });








  
    const { data: payments = [], refetch } = useQuery({
      queryKey: ["payments", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/payments/${user.email}`);
        return res.data;
      },
    });


    return (
        <div className='my-5'>
        <h2 className="text-2xl text-center uppercase">Total Payments:{payments.length} </h2>



        <div className='flex flex-col justify-center items-center gap-5 my-10'>
            <h2 className='text-xl'>Your Information</h2>
            <img className='w-10' src={user.photoURL} alt="" />
            <h2 className=''>Role : {users.role}</h2>
        </div>











        <div className="w-full min-h-screen">
          <table className="table-auto w-full border border-gray-200">
            {/* head */}
            <thead>
              <tr>
                <th className='px-1 py-1 text-center text-xs font-semibold border border-gray-200'>No.</th>
                <th className='px-1 py-1 text-center text-xs font-semibold border border-gray-200'>Price</th>
                <th className='px-1 py-1 text-center text-xs font-semibold border border-gray-200'>Transaction Id</th>
                <th className='px-1 py-1 text-center text-xs font-semibold border border-gray-200'>Status</th>
              </tr>
            </thead>
            <tbody>
              
             {
             payments.map((payment,index)=>  <tr key={payment._id}>
              <th className='px-0 py-1 text-xs border border-gray-200 text-center'>{index+1}</th>
              <td className="px-0 py-1 text-xs border text-center border-gray-200">$ {payment.price}</td>
              <td className="px-0 py-1 text-xs border text-center border-gray-200 break-words">{payment.transactionId}</td>
              <td className="px-0 py-1 text-xs border text-center border-gray-200 break-words">{payment.status}</td>
            </tr>)
             }
              
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default PaymentHistory;