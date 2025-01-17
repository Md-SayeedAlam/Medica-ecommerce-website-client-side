import React from 'react';
import useAxiosSecure from '../../Hookos/useAxiosSecure';
import UseAuth from '../../Hookos/UseAuth';
import { useQuery } from '@tanstack/react-query';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Loading from '../../Components/Loading';

const PaymentManagement = () => {

    const axiosSecure = useAxiosSecure()
    const {user,loading}= UseAuth()

    const { data: payments = [], refetch,isLoading} = useQuery({
        queryKey: ["payments"],
        
        queryFn: async () => {
          const res = await axiosSecure.get(
            `/payments`
    
          );
          return res.data;
        },
      });

      

      
        const handleChangeRole = (user, userStatus) => {
          if (user.status === userStatus) return;
        console.log(userStatus,user)
          axiosSecure
            .patch(`/payments/status/${user._id}`, { status: userStatus })
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: `${user.email}'s status updated to ${userStatus}`,
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




        if(loading) return <Loading></Loading>


    return (
        <div>
              <div className="flex justify-center gap-5 my-5">
                <h2 className="text-xl">All Payments</h2>
                <h2 className="text-xl">Total Payments:{payments.length}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Trans.Id</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Change Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((user, idx) => (
                      <tr key={user._id}>
                        <th>{idx + 1} </th>
                        <td>{user.transactionId}</td>
                        <td>{user.email} </td>
                        <td>{user.status} </td>
                        <td>
                          {user.status === "paid" ? (
                            "paid"
                          ) : (
                            <select
                              defaultValue={user.status}
                              onChange={(e) => handleChangeRole(user, e.target.value)}
                              name=""
                              id=""
                              disabled={user.status === "paid"}
                              className="px-2 py-1 rounded-md "
                            >
                                <option value="paid">Pending</option>
                              <option value="paid">Paid</option>
                              
                              
                              
                              
                            </select>
                          )}
                        </td>
                        <td>
                          {user.status === "paid" ? (
                            <button disabled className="p-4 hover:bg-red-200">
                              <FaTrash className="text-red-400 "></FaTrash>
                            </button>
                          ) : (
                            <button
                            //   onClick={() => handleDeleteUser(user)}
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

export default PaymentManagement;