import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import useMedicineCategory from "../../Hookos/useMedicineCategory";

const SliderSection = () => {
  // const [slides, setSlides] = useState([]);
  const [categories] = useMedicineCategory()

const advertise = categories.filter(category=>category.advertise === true)
console.log(advertise)
  // useEffect(() => {
  //   setSlides(categories);
  // }, [categories]);


 


  // useEffect(() => {
  //   fetch("http://localhost:5000/medicine")
  //     .then((res) => res.json())
  //     .then((data) => setSlides(data))
  //     .catch((err) => console.error("Error fetching slides:", err));
  // }, []);

  return (
    <div className="my-2">
      
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true} 
        modules={[Navigation]} 
         className="mySwiper"
       
      >
        {advertise.map((slide) => (
          <SwiperSlide key={slide._id}>
            
            <div className="relative">
          
          <img
            src={slide.image}
            alt={slide.name}
            className="w-full h-[500px] object-cover"
          />


          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 text-white">
            <h3 className="text-3xl font-bold">{slide.name}</h3>
            <p className="text-lg mt-2 text-center">{slide.description}</p>
          </div>
        </div>
           
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderSection;
