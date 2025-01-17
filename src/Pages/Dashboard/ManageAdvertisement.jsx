import React, { useState } from "react";
import useAxiosSecure from "../../Hookos/useAxiosSecure";
import {  useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../Components/Loading";


const ManageAdvertise = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const res = await axiosSecure.get("/medicine");
      return res.data;
    },
  });

  const handleAdvertise = async (id, advertise) => {
    try {
      const response = await axiosSecure.patch(`/advertise/${id}`, { advertise });
  
      queryClient.invalidateQueries(["medicines"]);
    } catch (error) {
      console.error("Error updating advertise:", error);
    }
  };
  

 
  return (
    <div className="px-4 overflow-auto">
      <h2 className="text-lg font-semibold my-4 text-center">Manage Banner Advertise</h2>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <table className="table-auto w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-1 py-1 border border-gray-300">No.</th>
              <th className="px-1 py-1 border border-gray-300">Image</th>
              <th className="px-1 py-1 border border-gray-300">Medicine Name</th>
              <th className="px-1 py-1 border border-gray-300">Description</th>
              <th className="px-1 py-1 border border-gray-300">Seller Email</th>
              <th className="px-1 py-1 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine, idx) => (
              <tr key={medicine._id} className="hover:bg-gray-50">
                <td className="px-1 py-1 text-center border border-gray-300">{idx + 1}</td>
                <td className="px-1 py-1 text-center border border-gray-300">
                  <img src={medicine.image} alt={medicine.name} className="w-10 h-10 rounded-full mx-auto" />
                </td>
                <td className="px-1 py-1 text-center border border-gray-300">{medicine.name}</td>
                <td className="px-1 py-1 text-center border border-gray-300 truncate max-w-xs">
                  {medicine.description}
                </td>
                <td className="px-1 py-1 text-center border border-gray-300">{medicine.addedBy}</td>
                <td className="px-1 py-1 text-center border border-gray-300">
                <button
  onClick={() => handleAdvertise(medicine._id, !medicine.advertise)}
  className={`px-1 py-1 rounded ${medicine.advertise ? "bg-green-500" : "bg-red-500"} text-white`}
>
  {medicine.advertise ? "Remove from Slide" : "Add to Slide"}
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageAdvertise;
