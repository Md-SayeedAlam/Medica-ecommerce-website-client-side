import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hookos/useAxiosSecure";
import UseAuth from "../../Hookos/UseAuth";
import { FaTrash } from "react-icons/fa";

const ManageMedicines = () => {
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const { user } = UseAuth();

  // Fetch medicines
  const { data: medicines = [], refetch } = useQuery({
    queryKey: ["Medicines", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/medicine/${user?.email}`);
      return res.data;
    },
  });

  // Handle Add Medicine
  const handleAddMedicine = async (event) => {
    event.preventDefault();
    const form = event.target;

    const newMedicine = {
      name: form.name.value,
      generic_name: form.genericName.value,
      description: form.description.value,
      image: form.image.value,
      category: form.category.value,
      company: form.company.value,
      unit: form.unit.value,
      unit_price: parseFloat(form.price.value),
      discount: parseFloat(form.discount.value || 0),
      addedBy: user.email,
    };

    try {
      const res = await axiosSecure.post("/medicine", newMedicine);

      if (res.data.insertedId) {
        Swal.fire("Success", "Medicine added successfully", "success");
        refetch();
        setShowModal(false); // Close the modal after successful addition
      }
    } catch (error) {
      Swal.fire("Error", "Failed to add medicine", "error");
    }
  };

 
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
         axiosSecure.delete(`/medicine/${id}`)
         .then((res) => {
           if (res.data.deletedCount > 0) {
             Swal.fire({
               title: "Deleted!",
               text: "User has been deleted.",
               icon: "success",
             });
             refetch();
           }
         });
       }
     });
   };

  return (
    <div>

      
        <h2 className="text-xl  text-center my-4">Manage Medicines</h2>
        <div className="flex justify-center items-center my-4">
        <button
          onClick={() => setShowModal(true)}
          className="btn bg-green-200 hover:bg-green-300 text-green-500 "
        >
          Add Medicine
        </button>
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
                Discount
              </th>
              <th className="px-1 py-1 text-center text-xs font-semibold border border-gray-200">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {medicines && medicines.length > 0 ? (
              medicines.map((item, index) => (
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
                    {item.discount}
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

      {/* Add Medicine Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <form onSubmit={handleAddMedicine}>
              <div className="form-control">
                <label className="label">Item Name</label>
                <input
                  className="input input-bordered"
                  type="text"
                  name="name"
                  required
                />
              </div>
              <div className="form-control">
                <label>Generic Name</label>
                <input
                  className="input input-bordered"
                  type="text"
                  name="genericName"
                  required
                />
              </div>
              <div className="form-control">
                <label>Description</label>
                <textarea
                  className="input input-bordered"
                  name="description"
                  required
                />
              </div>
              <div className="form-control">
                <label>Image URL</label>
                <input
                  className="input input-bordered"
                  type="url"
                  name="image"
                  required
                />
              </div>
              <div className="form-control">
                <label>Category</label>
                <select
                  className="py-3 border rounded-md"
                  name="category"
                  required
                >
                  <option value="Antibiotic">Capsule</option>
                  <option value="Analgesic">Eye Drop</option>
                  <option value="Analgesic">Injection</option>
                  <option value="Analgesic">Syrup</option>
                  <option value="Analgesic">Tablet</option>
                  <option value="Analgesic">Vitamin</option>
                  {/* Add more categories */}
                </select>
              </div>
              <div className="form-control">
                <label>Company</label>
                <input
                  className="input input-bordered"
                  type="text"
                  name="company"
                  required
                />
              </div>
              <div className="form-control">
                <label>Mass Unit (Mg/ML)</label>
                <input
                  className="input input-bordered"
                  type="text"
                  name="unit"
                  required
                />
              </div>
              <div className="form-control">
                <label>Per Unit Price</label>
                <input
                  className="input input-bordered"
                  type="number"
                  name="price"
                  required
                />
              </div>
              <div className="form-control">
                <label>Discount (%)</label>
                <input
                  className="input input-bordered"
                  type="number"
                  name="discount"
                  defaultValue="0"
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-success">
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-error"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMedicines;
