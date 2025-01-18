import React, { useState } from "react";
import useAxiosSecure from "../../Hookos/useAxiosSecure";
import UseAuth from "../../Hookos/UseAuth";
import { useQuery } from "@tanstack/react-query";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Loading from "../../Components/Loading";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const SalesReport = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    data: report = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["report", startDate, endDate],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/sells`, {
        params: { startDate, endDate },
      });
      return res.data;
    },
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Sales Report", 10, 10);

    const tableData = report.map((item, idx) => [
      idx + 1,
      item.name,
      item.addedBy,
      item.buyerEmail,
      `$${item.unit_price.toFixed(2)}`,
      item.quantity,
      `$${(item.unit_price * item.quantity).toFixed(2)}`,
    ]);

    doc.autoTable({
      head: [["No.", "Medicine Name", "Seller Email", "Buyer Email", "Unit Price", "Quantity", "Total"]],
      body: tableData,
    });

    doc.save("SalesReport.pdf");

    toast.success("File Downloaded successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
    
   
  };

  return (
    <div className="p-4">
        <Helmet>
              <title>Sells Report || Medica</title>
            </Helmet>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-5">
        <div className="flex gap-3 items-center">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded p-1"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded p-1"
          />
          <button
            onClick={refetch}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Filter
          </button>
        </div>
        <button
          onClick={exportToPDF}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-auto rounded border border-gray-200 shadow">
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <table className="table-auto w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-1 text-center border border-gray-300">No.</th>
                <th className="px-2 py-1 text-center border border-gray-300">Image</th>
                <th className="px-2 py-1 text-center border border-gray-300">Medicine Name</th>
                <th className="px-2 py-1 text-center border border-gray-300">Seller Email</th>
                <th className="px-2 py-1 text-center border border-gray-300">Buyer Email</th>
                <th className="px-2 py-1 text-center border border-gray-300">Unit Price</th>
                <th className="px-2 py-1 text-center border border-gray-300">Quantity</th>
                <th className="px-2 py-1 text-center border border-gray-300">Total</th>
              </tr>
            </thead>
            <tbody>
              {report.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-2 py-1 text-center border border-gray-300">{idx + 1}</td>
                  <td className="px-2 py-1 text-center border border-gray-300">
                    <img className="w-8 h-8 rounded-full mx-auto" src={item.image} alt="" />
                  </td>
                  <td className="px-2 py-1 text-center border border-gray-300 truncate">{item.name}</td>
                  <td className="px-2 py-1 text-center border border-gray-300 truncate">{item.addedBy}</td>
                  <td className="px-2 py-1 text-center border border-gray-300 truncate">{item.buyerEmail}</td>
                  <td className="px-2 py-1 text-center border border-gray-300">${item.unit_price.toFixed(2)}</td>
                  <td className="px-2 py-1 text-center border border-gray-300">{item.quantity}</td>
                  <td className="px-2 py-1 text-center border border-gray-300">
                    ${(item.unit_price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SalesReport;
