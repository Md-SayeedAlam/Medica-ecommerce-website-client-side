import React from 'react';
import useAxiosSecure from '../../Hookos/useAxiosSecure';
import UseAuth from '../../Hookos/UseAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';

const SellerPaymentHistory = () => {

    const {user,loading} = UseAuth()
    const axiosSecure = useAxiosSecure();

  const {data:purchaseHistory,isLoading} = useQuery({
    queryKey:["purchaseHistory", user?.email],
    enabled:!loading && !! user?.email,
    queryFn: async () => {
        const response = await axiosSecure.get(`/seller/purchase-history/${user?.email}`);
        return response.data;
      },
  })

  if (isLoading) {
    return <Loading></Loading>
  }

  






    return (
        <div>
        <h2 className='text-xl text-center my-5'>Purchase History</h2>
        <div className='w-full overflow-auto min-h-screen'>
      
      {purchaseHistory.length > 0 ? (
        <table className="table-auto border-collapse border border-gray-200 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Medicine Name</th>
              <th className="border border-gray-300 px-4 py-2">Buyer Email</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {purchaseHistory.map((history, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{history.medicineName}</td>
                <td className="border border-gray-300 px-4 py-2">{history.buyerEmail}</td>
                <td className="border border-gray-300 px-4 py-2">${history.price.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">{history.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(history.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-red-400 text-xl text-center mt-5'>No purchase history available for {user.displayName}.</p>
      )}
    </div>
    </div>
  );
    
};

export default SellerPaymentHistory;