import React from 'react';
import useAxiosSecure from '../../Hookos/useAxiosSecure';
import UseAuth from '../../Hookos/UseAuth';
import { useQuery } from '@tanstack/react-query';
import { FaDollarSign } from 'react-icons/fa';




const AdminHomepage = () => {

    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = [],isLoading } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
          const res = await axiosSecure.get("/admin-stats");
          console.log(res.data);
          return res.data;
        },
        
      });
      const { totalRevenue, paidTotal, pendingTotal } = stats;
    //   console.log(stats)

    return (
        <div className='flex flex-col justify-center items-center gap-5 mt-10'>
            <h2 className="text-3xl"><span > Hi Welcome</span></h2>
            <h2 className='text-2xl mt-5'>{user?.displayName ? user.displayName : "Back"}</h2>


            <div className="stats shadow flex flex-wrap justify-center gap-5 sm:gap-10 p-5">
  <div className="stat w-full sm:w-auto flex-1">
    <div className="stat-figure text-secondary">
      <FaDollarSign className="text-3xl"></FaDollarSign>
    </div>
    <div className="stat-title">Total Revenue</div>
    <div className="stat-value text-xl sm:text-2xl lg:text-3xl">${totalRevenue}</div>
  </div>

  <div className="stat w-full sm:w-auto flex-1">
    <div className="stat-figure text-secondary">
      <FaDollarSign className="text-3xl"></FaDollarSign>
    </div>
    <div className="stat-title">Paid Total</div>
    <div className="stat-value text-xl sm:text-2xl lg:text-3xl">{paidTotal}</div>
  </div>

  <div className="stat w-full sm:w-auto flex-1">
    <div className="stat-figure text-secondary">
      <FaDollarSign className="text-3xl"></FaDollarSign>
    </div>
    <div className="stat-title">Pending Total</div>
    <div className="stat-value text-xl sm:text-2xl lg:text-3xl">{pendingTotal}</div>
  </div>
</div>




       
      </div>


        
    );
};

export default AdminHomepage;