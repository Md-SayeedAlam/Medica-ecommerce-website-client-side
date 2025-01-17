import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hookos/useAxiosSecure";
import { useForm } from "react-hook-form";
import Loading from "../../Components/Loading";
import UseAuth from "../../Hookos/UseAuth";

// ImgBB API setup
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ManageCategories = () => {
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const {loading} = UseAuth()
  // Fetch categories
  const { data: categories = [], refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/categories");
      return res.data;
    },
  });

  // Handle Add/Update Category
  const onSubmit = async (data) => {
    try {
      let categoryImageURL = data.categoryImageURL;

      // Check if an image is uploaded
      if (data.categoryImage[0]) {
        const formData = new FormData();
        formData.append("image", data.categoryImage[0]);

        // Upload image to ImgBB
        const imgbbResponse = await fetch(image_hosting_api, {
          method: "POST",
          body: formData,
        });

        const imgbbResult = await imgbbResponse.json();
        if (imgbbResult.success) {
          categoryImageURL = imgbbResult.data.url; // Get uploaded image URL
        } else {
          throw new Error("Image upload failed");
        }
      }

      const newCategory = {
        categoryName: data.categoryName,
        categoryImage: categoryImageURL, // Use uploaded URL or the provided URL
      };

      if (editingCategory) {
        // Update category logic
        const res = await axiosSecure.put(`/categories/${editingCategory}`, newCategory);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Updated!", "Category updated successfully", "success");
        }
      } else {
        // Add new category logic
        const res = await axiosSecure.post("/categories", newCategory);
        if (res.data.insertedId) {
          Swal.fire("Added!", "Category added successfully", "success");
        }
      }

      reset();
      setShowModal(false);
      refetch();
    } catch (error) {
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };

  // Handle Delete Category
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This category will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/categories/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Category deleted successfully", "success");
          refetch();
        }
      }
    });
  };
  if(loading) return <Loading></Loading>
  return (
    <div>
      <h2 className="text-xl text-center my-4">Manage Categories</h2>
      <div className="flex justify-center items-center my-4">
        <button
          onClick={() => {
            setEditingCategory(null);
            setShowModal(true);
          }}
          className="btn bg-blue-500 hover:bg-blue-600 text-white"
        >
          Add Category
        </button>
      </div>

      <div className="w-full min-h-screen">
        <table className="table-auto w-full border border-gray-200">
          <thead>
            <tr className="flex justify-between items-center">
              <th className="px-1 py-2">No</th>
              <th className="px-1 py-2">Category Name</th>
              <th className="px-1 py-2">Image</th>
              <th className="px-1 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={index} className="flex justify-between items-center">
                  <td className="px-1 py-2">{index + 1}</td>
                  <td className="px-1 py-2">{category.categoryName}</td>
                  <td className="px-1 py-2">
                    <img
                      src={category.categoryImage}
                      alt="Category"
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-1 py-2">
                    <button
                      onClick={() => {
                        setEditingCategory(category.categoryName);
                        setShowModal(true);
                      }}
                      className="btn btn-xs bg-yellow-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="btn btn-xs bg-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-red-500 py-4">
                  No Categories Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label>Category Name</label>
                <input
                  type="text"
                  className="input input-bordered"
                  {...register("categoryName", { required: true })}
                  defaultValue={editingCategory || ""}
                />
              </div>
              <div className="form-control">
                <label>Category Image URL</label>
                <input
                  type="url"
                  className="input input-bordered"
                  {...register("categoryImageURL")}
                />
              </div>
              <div className="form-control">
                <label>Or Upload Image</label>
                <input
                  type="file"
                  className="file-input file-input-bordered"
                  {...register("categoryImage")}
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-success">
                  {editingCategory ? "Update" : "Add"}
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

export default ManageCategories;
