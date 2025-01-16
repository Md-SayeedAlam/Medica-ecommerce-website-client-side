import React from "react";
import useAxiosSecure from "./../../Hookos/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAuth from "../../Hookos/UseAuth";
import Loading from "../../Components/Loading";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user ,loading} = UseAuth();
  const { data: users = [], refetch,isLoading} = useQuery({
    queryKey: ["users"],
    
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/${user?.email}`

      );
      return res.data;
    },
  });

  const handleChangeRole = (user, userRole) => {
    if (user.role === userRole) return;
  
    axiosSecure
      .patch(`/users/role/${user._id}`, { role: userRole })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${user.name}'s role updated to ${userRole}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.error("Error updating role:", err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to update role!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  

  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
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

if(loading) return <Loading></Loading>
 

  return (
    <div>
      <div className="flex justify-center gap-5 my-5">
        <h2 className="text-xl">All Users</h2>
        <h2 className="text-xl">Total Users:{users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <th>{idx + 1} </th>
                <td>{user.name}</td>
                <td>{user.email} </td>
                <td>{user.role} </td>
                <td>
                  {user.role === "Admin" ? (
                    "Admin"
                  ) : (
                    <select
                      defaultValue={user.role}
                      onChange={(e) => handleChangeRole(user, e.target.value)}
                      name=""
                      id=""
                      disabled={user.role === "Admin"}
                      className="px-2 py-1 rounded-md "
                    >
                      <option value="Seller">Seller</option>
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                  )}
                </td>
                <td>
                  {user.role === "Admin" ? (
                    <button disabled className="p-4 hover:bg-red-200">
                      <FaTrash className="text-red-400 "></FaTrash>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn btn-ghost"
                    >
                      <FaTrash className="text-red-400"></FaTrash>
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

export default AllUsers;
