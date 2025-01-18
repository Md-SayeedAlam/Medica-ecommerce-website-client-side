import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hookos/useAxiosSecure";
import Loading from "../../Components/Loading";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const ManageAdvertise = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

 
  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ["advertiseRequests"],
    queryFn: async () => {
      const response = await axiosSecure.get("/advertise/medicine");
      return response.data;
    },
  });

  const handleAdvertise = async (id, advertise) => {
    try {
      await axiosSecure.patch(`/advertise/${id}`, { advertise });
      queryClient.invalidateQueries(["advertiseRequests"]);
      toast.success("Request Updated Successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } 
    
    catch (error) {
      console.error("Error updating advertisement status:", error);
    }
  };
 

  if (isLoading) return <Loading />;

  return (
    <div>
        <Helmet>
              <title>Manage Advertise || Medica</title>
            </Helmet>
      <h2 className="text-lg font-semibold my-4 text-center">Manage Advertisements</h2>
      <div className="overflow-auto px-4">
        <table className="table-auto w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-1 py-1 border border-gray-300">No.</th>
              <th className="px-1 py-1 border border-gray-300">Image</th>
              <th className="px-1 py-1 border border-gray-300">Medicine Name</th>
              <th className="px-1 py-1 border border-gray-300">Description</th>
              <th className="px-1 py-1 border border-gray-300">Seller Email</th>
              <th className="px-1 py-1 border border-gray-300">Status</th>
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
                <td className="px-2 py-2 text-center border border-gray-300 truncate max-w-xs">
                  {medicine.description || "N/A"}
                </td>
                <td className="px-1 py-1 text-center border border-gray-300">{medicine.addedBy}</td>
                <td className="px-1 py-1 text-center border border-gray-300">
                  {medicine.advertise === "pending" ? "Pending" : "Active"}
                </td>
                <td className="px-1 py-1 text-center border border-gray-300">
                  {medicine.advertise === "pending" ? (
                    <>
                      <button
                        onClick={() => handleAdvertise(medicine._id, true)}
                        className="px-1 py-1 bg-green-500 text-white rounded mx-1"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAdvertise(medicine._id, false)}
                        className="px-1 py-1 bg-red-500 text-white rounded"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleAdvertise(medicine._id, !medicine.advertise)}
                      className={`px-1 py-1 rounded ${
                        medicine.advertise ? "bg-red-500" : "bg-green-500"
                      } text-white`}
                    >
                      {medicine.advertise ? "Remove from Slider" : "Add to Slider"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAdvertise;
