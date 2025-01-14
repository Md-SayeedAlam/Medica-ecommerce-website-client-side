import React from 'react';

const Card = ({item}) => {
    return (
        <div className="card bg-base-100 w-96 h-[500px] shadow-xl">
  <figure className="px-10 pt-10">
    <img
    className="w-full h-52 object-cover rounded-xl"
      src={item.image}
      alt="item"
      />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{item.name} </h2>
    
        <p className=" pt-1"><span className="font-medium">Unit Price :</span> ${item.unit_price}</p>
        <p className=" pt-1"><span className="font-medium">Discount Price :</span> ${item.discount}</p>
    <div className="card-actions">
      <button className="btn btn-xs hover:bg-green-200 bg-green-100 text-green-500">Add To Cart</button>
    </div>
  </div>
</div>
    );
};

export default Card;