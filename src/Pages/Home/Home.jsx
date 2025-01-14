import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import  image1 from '../../../public/1.avif'
import  image2 from '../../../public/2.jpg'
import  image3 from '../../../public/3.jpg'
import  image4 from '../../../public/4.jpeg'
import { Helmet } from 'react-helmet-async';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import MedicineCategory from "../../Components/MedicineCategory";

const Home = () => {
  return (
    <div className="">
        <Helmet>
            <title>Home || Medica</title>
        </Helmet>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      <SwiperSlide><img className="w-full h-96 object-cover" src={image1} alt="Slide 1" /></SwiperSlide>
        <SwiperSlide><img className="w-full h-96 object-cover" src={image2} alt="Slide 2" /></SwiperSlide>
        <SwiperSlide><img className="w-full h-96 object-cover" src={image3} alt="Slide 3" /></SwiperSlide>
        <SwiperSlide><img className="w-full h-96 object-cover" src={image4} alt="Slide 4" /></SwiperSlide>
      
       
      </Swiper>

        {/* medicine category */}
      <div className="my-10">
        <h3 className="text-center font-semibold text-3xl uppercase mb-5">Medicine Category</h3>
        <MedicineCategory></MedicineCategory>

      </div>
    </div>
  );
};

export default Home;
