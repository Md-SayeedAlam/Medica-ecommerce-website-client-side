import React from 'react';
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import useMedicineCategory from '../Hookos/useMedicineCategory';
import Card from './Card';


const DiscountMedicine = () => {
    const [categories] = useMedicineCategory()
    const items = categories.filter(item=>item.discount > 0)

  

    return (
        <div className='container mx-auto'>
            <Swiper
       slidesPerView={1} // Default for small screens
       spaceBetween={16}
       pagination={{
         clickable: true,
       }}
       breakpoints={{
         640: {
           slidesPerView: 1, // 1 slide for devices 640px and above
           spaceBetween: 16,
         },
         768: {
           slidesPerView: 2, // 2 slides for devices 768px and above
           spaceBetween: 24,
         },
         1024: {
           slidesPerView: 3, // 3 slides for devices 1024px and above
           spaceBetween: 30,
         },
       }}
       modules={[Pagination]}
      className="mySwiper"
    >
     
      {
        items.map(item=> 
        <SwiperSlide key={item._id} className='pl-6 lg:pl-0'>
           <Card  item={item}></Card>
            
          </SwiperSlide>)
      }

    </Swiper>
        </div>
    );
};

export default DiscountMedicine;