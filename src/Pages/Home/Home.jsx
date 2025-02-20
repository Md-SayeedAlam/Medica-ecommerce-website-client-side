import React from "react";

import quality from "../../../public/quality.jpg";
import price from "../../../public/price.jpg";
import fast from "../../../public/fast.png";
import twenty from "../../../public/twenty.jpg";

import { Helmet } from "react-helmet-async";

import MedicineCategory from "../../Components/MedicineCategory";
import DiscountMedicine from "../../Components/DiscountMedicine";
import SliderSection from "./SliderSection";
import Swal from "sweetalert2";

const Home = () => {
  const handleNews = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Email has been sent successfully`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

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

      <div className=" py-12">
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

      {/* Best Selling Medicines */}
      <section className="my-10 py-10 ">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Best Selling Medicines</h2>

          <strong className=" text-green-500">
            Sergel 20 mg Capsule | Napa 500 mg Tablet | Ceevit 250 mg Chewable
            Tablet | Monas 10 10 mg Tablet | Pantonix 20 mg Tablet | Ecosprin 75
            mg Tablet | Fexo 120 mg Tablet | Atova 10 mg Tablet | Bizoran 5
            mg+20 mg Tablet | Thyrox 50 mcg Tablet | Rosuva 10 mg Tablet | Napa
            Extend 665 mg Tablet | Maxpro 20 mg Tablet | Bislol 2.5 mg Tablet |
            Neuro-B Tablet | Uromax 0.4 mg Capsule | Omidon 10 mg Tablet |
            Osartil 50 mg Tablet | Linaglip 5 mg Tablet | Clopid 75 mg Tablet
          </strong>
        </div>
      </section>

      {/* Benefits of Using Medica Section */}

      <section className="my-10 py-10 ">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Benefits of Using Medica</h2>

          <p className="text-center lg:text-left space-y-3">
            Medica is an online pharmacy that provides a convenient and
            affordable way to access medication. It offers many benefits for
            customers, such as:{" "}
            <p className="pt-2">1. Easy and convenient access to health care services.</p>{" "}
            <p>2. Comprehensive database of health care providers.</p>{" "}
            <p>3. 24/7 customer service and support.</p>{" "}
            <p> 4. Secure and user-friendly platform.</p>{" "}
            <p>
              5. Discounts and deals to make health care services more
              affordable.{" "}
            </p>{" "}
            <p>6. Access to health records and medical advice. </p>{" "}
            <p>7. Fast and reliable delivery of medicines. </p>{" "}
            <p>8. Professional and experienced health care professionals.</p>{" "}
            <p>9. Access to reliable information on health and wellness.</p>
          </p>
        </div>
      </section>

    {/* Delivery Services */}
      <section className="shadow-lg rounded-lg my-10 py-5">
      <h2 className="text-2xl text-center font-bold text-gray-800 mb-4">Delivery Services</h2>
     
      <div className="overflow-x-auto container mx-auto">
      <p className="text-gray-600 mb-4 text-center">
        Our delivery services are tailored to your needs. We provide regular delivery within 4 hours
        of order acceptance. For faster service, our Urgent Delivery ensures delivery within 45 minutes.
      </p>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Delivery Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Estimated Delivery Time</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="border border-gray-300 px-4 py-2">Urgent Delivery</td>
              <td className="border border-gray-300 px-4 py-2">45 minutes</td>
              <td className="border border-gray-300 px-4 py-2">BDT 130/=</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">Regular Delivery</td>
              <td className="border border-gray-300 px-4 py-2">2 hours - 4 hours</td>
              <td className="border border-gray-300 px-4 py-2">BDT 130/=</td>
            </tr>
            <tr className="bg-white">
              <td className="border border-gray-300 px-4 py-2">Next Day Delivery</td>
              <td className="border border-gray-300 px-4 py-2">24 hours - 36 hours</td>
              <td className="border border-gray-300 px-4 py-2">BDT 60/=</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">Courier Delivery (outside Dhaka city)</td>
              <td className="border border-gray-300 px-4 py-2">2 to 5 working days</td>
              <td className="border border-gray-300 px-4 py-2">BDT 110/=</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>





      {/* extra newsletter section */}

      <div className=" py-10 mb-2">
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
            <button
              onClick={handleNews}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
