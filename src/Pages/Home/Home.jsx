import React from "react";

import quality from "../../../public/quality.jpg";
import price from "../../../public/price.jpg";
import fast from "../../../public/fast.png";
import twenty from "../../../public/twenty.jpg";

import { Helmet } from "react-helmet-async";


import MedicineCategory from "../../Components/MedicineCategory";
import DiscountMedicine from "../../Components/DiscountMedicine";
import SliderSection from "./SliderSection";

const Home = () => {
  return (
    <div className="">
      <Helmet>
        <title>Home || Medica</title>
      </Helmet>

      {/* slider */}

      <SliderSection></SliderSection>

      {/* medicine category */}
      <div className="my-10">
        <h3 className="text-center font-semibold text-3xl uppercase mb-5">
          Medicine Category
        </h3>
        <MedicineCategory></MedicineCategory>
      </div>

      {/* discount medicine products */}

      <div className="my-10 ">
        <h3 className="text-center font-semibold text-3xl uppercase mb-5">
          Discounted Medicine
        </h3>
        <DiscountMedicine></DiscountMedicine>
      </div>

      {/* why choose us section */}
      
      <div className="bg-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
          <p className="text-gray-600 mb-10">
            Discover the reasons why thousands trust us for their health and
            wellness needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="p-6  rounded-lg shadow-md">
              <img
                src={quality}
                alt="Quality"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">High Quality</h3>
              <p className="text-gray-600">
                We offer premium quality medicines and health products sourced
                from trusted manufacturers.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6  rounded-lg shadow-md">
              <img
                src={price}
                alt="Affordable"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
              <p className="text-gray-600">
                Get the best deals on a wide range of medicines and products.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6  rounded-lg shadow-md">
              <img
                src={fast}
                alt="Fast Delivery"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Enjoy quick and reliable delivery to your doorstep, every time.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6  rounded-lg shadow-md">
              <img
                src={twenty}
                alt="Support"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our team is available around the clock to assist you with any
                queries or concerns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* extra newsletter section */}

      <div className="bg-gray-50 py-10 mb-2">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-6">
            Stay updated with our latest products and exclusive offers.
          </p>
          <div className="flex justify-center items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full max-w-md border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
