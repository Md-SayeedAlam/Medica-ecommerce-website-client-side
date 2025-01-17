import React from "react";
import useAxiosSecure from "../../Hookos/useAxiosSecure";
import UseAuth from "../../Hookos/UseAuth";
import { useQuery } from "@tanstack/react-query";

const SalesReport = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = UseAuth();

  const {
    data: report = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["report"],

    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/sells`);
      return res.data;
    },
  });

  console.log(report);
 

  return (
    <div>
      <div className="flex justify-center gap-5 my-5">
       
        <h2 className="text-xl">Total Sales Report :{report.length}</h2>
      </div>
      <div className="w-full min-h-screen">
        <table className="table-auto w-full border border-gray-200">
          {/* head */}
          <thead>
            <tr>
              <th className="px-0 py-1 text-center text-xs font-semibold border border-gray-200">
                No.
              </th>
              <th className="px-1 py-1 text-center text-xs font-semibold border border-gray-200">
                Image
              </th>
              <th className="px-0 py-1 text-center text-xs font-semibold border border-gray-200">
                Medicine Name
              </th>
              <th className="px-0 py-1 text-center text-xs font-semibold border border-gray-200 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap break-words">
                Seller Email
              </th>
              <th className="px-0 py-1 text-center text-xs font-semibold border border-gray-200 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap break-words">
                Buyer Email
              </th>
            </tr>
            
          </thead>
          <tbody>
            {report.map((user, idx) => (
              <tr key={idx}>
                <th className="px-0 py-1 text-center text-xs font-semibold border border-gray-200">
                  {idx + 1}
                </th>
                <th className="px-1 py-1 text-center text-xs font-semibold border border-gray-200">
                  <img className="w-8 rounded-full" src={user.image} alt="" />
                </th>
                <td className="px-0 py-1 text-center text-xs border border-gray-200">
                  {user.name}
                </td>
                <td className="px-0 py-1 text-xs border border-gray-200 text-center break-words max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                {user.addedBy}
                </td>
                <td className="px-0 py-1 text-xs border border-gray-200 text-center break-words max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                {user.buyerEmail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </div>
  );
};

export default SalesReport;
