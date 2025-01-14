

import React from "react";

const Modal = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <img className="w-full object-cover h-64" src={item.image} alt="" />
        <h3 className="font-bold text-lg">{item.name}</h3>
        <p className=" pt-1"><span className="font-medium">Unit Price :</span> ${item.unit_price}</p>
        <p className=" pt-1"><span className="font-medium">Discount Price :</span> ${item.discount}</p>
        <p className=" pt-1"><span className="font-medium">Category :</span> {item.category}</p>
        <p className=" pt-1"><span className="font-medium">Company :</span> {item.company}</p>
        <p className="pt-2"><span className="font-medium">Description :</span> {item.description || "No description available."}</p>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
