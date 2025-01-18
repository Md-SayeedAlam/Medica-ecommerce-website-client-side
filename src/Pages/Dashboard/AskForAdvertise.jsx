import React, { useState } from "react";
import UseAuth from "../../Hookos/UseAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hookos/useAxiosSecure";
import toast from "react-hot-toast";

const AskForAdvertise = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = UseAuth();
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const { data: medicines = [], refetch, isLoading } = useQuery({
    queryKey: ["medicines", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const response = await axiosSecure.get(`/medicine/seller/advertise/${user?.email}`);
      return response.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = e.target.description.value;
    const image = e.target.image.value;

    try {
      await axiosSecure.patch(`/medicine/request-advertise/${selectedMedicine._id}`, {
        advertise: "pending",
        description,
        image,
      });
      toast.success("Advertisement request submitted!", {
        position: "top-right",
        autoClose: 2000,
      });
      
      setSelectedMedicine(null);
      refetch();
    } catch (error) {
      console.error("Error requesting advertisement:", error);
      toast.error("Failed to submit request. Try again.");
    }
  };

  const handleAdvertise = (medicine) => setSelectedMedicine(medicine);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
        <h2 className="text-lg text-center font-bold mb-4">Ask For Advertisement</h2>
    
    <div className="overflow-auto w-full">
      
      <table className="table-auto border-collapse border border-gray-200 w-full">
        <thead>
          <tr>
            <th className="px-0 py-1 text-xs border text-center border-gray-200 break-words">No.</th>
            <th className="px-0 py-1 text-xs border text-center border-gray-200 break-words">Medicine</th>
            <th className="px-0 py-1 text-xs border text-center border-gray-200 break-words">Category</th>
            <th className="px-0 py-1 text-xs border text-center border-gray-200 break-words">Status</th>
            <th className="px-0 py-1 text-xs border text-center border-gray-200 break-words">Action</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine,idx) => (
            <tr key={medicine._id}>
              <td className="px-0 py-1 text-xs border text-center border-gray-200 break-words">{idx+1}</td>
              <td className="px-0 py-1 text-xs border text-center border-gray-200 break-words">{medicine.name}</td>
              <td className="px-0 py-1 text-xs border text-center border-gray-200 break-words">{medicine.category}</td>
              <td className="px-0 py-1 text-xs border text-center border-gray-200 break-words">
                {medicine.advertise === "true"
                  ? "In Slider"
                  : medicine.advertise === "pending"
                  ? "Pending"
                  : "Not Advertised"}
              </td>
              <td className="px-0 py-1 text-xs border text-center border-gray-200 break-words">
                {medicine.advertise !== "true" && (
                  <button
                    className="bg-green-500 text-white px-2 py-2 rounded "
                    onClick={() => handleAdvertise(medicine)}
                  >
                    Request Advertisement
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Request Advertisement</h3>
            <form onSubmit={handleSubmit}>
              <textarea name="description" placeholder="Description" required className="w-full mb-2 p-2 border rounded" />
              <input type="url" name="image" placeholder="Image URL" required className="w-full mb-2 p-2 border rounded" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setSelectedMedicine(null)} className="px-4 py-2 bg-gray-400 rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default AskForAdvertise;
