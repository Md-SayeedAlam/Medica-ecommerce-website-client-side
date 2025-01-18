import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import useAxiosSecure from '../../Hookos/useAxiosSecure';
import UseAuth from '../../Hookos/UseAuth';
import useCart from '../../Hookos/useCart';
import jsPDF from 'jspdf';

import "jspdf-autotable";
import useAxiosPublic from '../../Hookos/useAxiosPublic';
import Swal from 'sweetalert2';
import Loading from '../../Components/Loading';
import { Helmet } from 'react-helmet-async';
const PaymentHistory = () => {


    const { user ,loading} = UseAuth();
    const [cart] = useCart()
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()
    const printRef = useRef(); // For printing functionality

    
    
    const { data: users = [],isLoading} = useQuery({
      queryKey: ["users"],
      
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/users/api/${user?.email}`
  
        );
        return res.data;
      },
    });

console.log(users)






  
    const { data: payments = [], refetch } = useQuery({
      queryKey: ["payments", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/payments/${user.email}`);
        return res.data;
      },
    });




    const generatePDF = () => {
      const doc = new jsPDF();
      doc.text("Invoice", 20, 10); 
      doc.addImage(user.photoURL, "JPEG", 170, 10, 20, 20); 
      doc.text(`User Name: ${user.displayName}`, 20, 30);
      doc.text(`User Email: ${user.email}`, 20, 40);
      doc.text(`Role: ${users.role}`, 20, 50);
  
      // Add payment data
      const tableColumn = ["No.", "Price", "Transaction ID", "Status"];
      const tableRows = payments.map((payment, index) => [
        index + 1,
        `$${payment.price}`,
        payment.transactionId,
        payment.status,
      ]);
  
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 60,
      });
      
      doc.save("invoice.pdf");
     Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Invoice successfully Downloaded",
                    showConfirmButton: false,
                    timer: 1500
                  });
    };


    if(loading) return <Loading></Loading>


    return (
        <div className='my-5'>
            <Helmet>
                  <title>Payment History || Medica</title>
                </Helmet>
       <div className='flex flex-col justify-center items-center gap-2'>
       <img className='w-10 rounded-full' src="/medica-logo.avif" alt="" />
       <h2 className="text-2xl text-center uppercase">Total Payments:{payments.length} </h2>
       </div>



        <div className='flex flex-col justify-center items-center gap-5 my-10'>
            <h2 className='text-xl'>Your Information</h2>
            <img className='w-10 rounded-full' src={user.photoURL} alt="" />
            <h2 className=''>Role : {users.role}</h2>
        </div>





        <div ref={printRef} className="w-full">
          <table className="table-auto w-full border border-gray-200">
            {/* head */}
            <thead>
              <tr>
                <th className='px-1 py-1 text-center text-xs font-semibold border border-gray-200'>No.</th>
                <th className='px-1 py-1 text-center text-xs font-semibold border border-gray-200'>Price</th>
                <th className='px-1 py-1 text-center text-xs font-semibold border border-gray-200'>Transaction Id</th>
                <th className='px-1 py-1 text-center text-xs font-semibold border border-gray-200'>Status</th>
              </tr>
            </thead>
            <tbody>
              
             {
             payments.map((payment,index)=>  <tr key={payment._id}>
              <th className='px-0 py-1 text-xs border border-gray-200 text-center'>{index+1}</th>
              <td className="px-0 py-1 text-xs border text-center border-gray-200">$ {payment.price}</td>
              <td className="px-0 py-1 text-xs border text-center border-gray-200 break-words">{payment.transactionId}</td>
              <td className="px-0 py-1 text-xs border text-center border-gray-200 break-words">{payment.status}</td>
            </tr>)
             }
              
            </tbody>
          </table>
        </div>


        <div className="flex justify-center gap-4 mt-5">
        <button
          onClick={() => window.print()}
         
          className="btn bg-blue-500 hover:bg-blue-600 text-white"
        >
          Print Invoice
        </button>
        <button
          onClick={generatePDF}
          className="btn bg-green-500 hover:bg-green-600 text-white"
        >
          Download PDF
        </button>
      </div>




      </div>
    );
};

export default PaymentHistory;