import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import capsulE from "../../public/capsule-1.jpg";
import eyeDrop from "../../public/eyedrop.jpeg";
import injectioN from "../../public/injection.jpeg";
import syruP from "../../public/syrup.jpg";
import tablets from "../../public/tablets.jpeg";
import vitamiN from "../../public/vitamins.webp";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import useMedicineCategory from "../Hookos/useMedicineCategory";


const MedicineCategory = () => {

    const [categories] = useMedicineCategory()

    const capsule = categories.filter(item=>item.category === 'capsule')
    const eyedrop = categories.filter((item) => item.category === "eyedrop");
    const injection = categories.filter((item) => item.category === "injection");
    const syrup = categories.filter((item) => item.category === "syrup");
    const tablet = categories.filter((item) => item.category === "tablet");
    const vitamin = categories.filter((item) => item.category === "vitamin");

  return (
    <>

     {/* <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img className="w-full h-64 object-cover" src={capsule} alt="capsule" />
        <h3 className="text-3xl uppercase text-center -mt-10">Capsule 60pcs</h3>
        
      </SwiperSlide>
      <SwiperSlide>
        <img className="w-full h-64 object-cover" src={eyeDrop} alt="eyeDrop" />
        <h3 className="text-3xl uppercase text-center -mt-10">Eye Drop 20pcs</h3>
      </SwiperSlide>
      <SwiperSlide>
        <img  className="w-full h-64 object-cover" src={injection} alt="injection" />
        <h3 className="text-3xl uppercase text-center -mt-10">injection 30pcs</h3>
      </SwiperSlide>
      <SwiperSlide>
        <img className="w-full h-64 object-cover" src={syrup} alt="syrup" />
        <h3 className="text-3xl uppercase text-center -mt-10">syrup 100pcs</h3>
      </SwiperSlide>
      <SwiperSlide>
        <img className="w-full h-64 object-cover" src={tablets} alt="tablets" />
        <h3 className="text-3xl uppercase text-center -mt-10">tablets 50pcs</h3>
      </SwiperSlide>
      <SwiperSlide>
        <img className="w-full h-64 object-cover" src={vitamin} alt="vitamin" />
        <h3 className="text-3xl uppercase text-center -mt-10">vitamin 50pcs</h3>
      </SwiperSlide>
    </Swiper> */}


      {/* categories section */}

      <section className="py-8 ">
      <div className="container mx-auto px-4">
        
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link  to='/capsule'>
            <div className="p-4 bg-gray-100 shadow-md rounded-lg text-center h-96">
            
            <img className="w-full h-64 object-cover" src={capsulE} alt="capsule" />
              <h3 className="text-lg font-semibold my-1">Capsule</h3>
              <p>Quantity : {capsule.length}</p>
              <p>
              Explore our wide range of capsules for your health needs.
              </p>
              
            </div>
            </Link >
          
            <Link to='/eyedrop'>
            <div className="p-4 bg-gray-100 shadow-md rounded-lg text-center h-96" >
            <img className="w-full h-64 object-cover" src={eyeDrop} alt="eyeDrop" />
              <h3 className="text-lg font-semibold my-1">Eye Drop</h3>
              <p>Quantity : {eyedrop.length}</p>
              <p>Discover top-quality eye drops for your care.</p>
            </div>
            </Link>

         <Link to='/injection'>
         <div className="p-4 bg-gray-100 shadow-md rounded-lg text-center h-96">
            <img className="w-full h-64 object-cover" src={injectioN} alt="injection" />
              <h3 className="text-lg font-semibold my-1">Injection</h3>
              <p>Quantity : {injection.length}</p>
              <p>Shop various injections for different treatments.</p>
            </div>
         </Link>

           <Link to='/syrup'>
           <div className="p-4 bg-gray-100 shadow-md rounded-lg text-center h-96">
            <img className="w-full h-64 object-cover" src={syruP} alt="Syrup" />
              <h3 className="text-lg font-semibold my-1">Syrup</h3>
              <p>Quantity : {syrup.length}</p>
              <p>
              Find syrups for all kinds of health needs
              </p>
            </div>
           </Link>

            <Link to='/tablet'>
            <div className="p-4 bg-gray-100 shadow-md rounded-lg text-center h-96">
            <img className="w-full h-64 object-cover" src={tablets} alt="tablets" />

              <h3 className="text-lg font-semibold my-1">Tablets</h3>
              <p>Quantity : {tablet.length}</p>
              <p>
              Check out our collection of essential tablets.
              </p>
            </div>
            </Link>

           

            <Link to='/vitamin'>
            <div className="p-4 bg-gray-100 shadow-md rounded-lg text-center h-96">
            <img className="w-full h-64 object-cover" src={vitamiN} alt="vitamin" />
              <h3 className="text-lg font-semibold my-1">Vitamins</h3>
              <p>Quantity : {vitamin.length}</p>
              <p>Get the best vitamins to support your daily health.</p>
            </div>
            </Link>


          </div>
        
      </div>
    </section>




    </>






  );
};

export default MedicineCategory;
