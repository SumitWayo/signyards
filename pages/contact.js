import React from "react";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiFacebook,
  FiTwitter,
  FiInstagram,
} from "react-icons/fi";

const Contact = () => {
  return (
    <div className="h-screen bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-wrap justify-between text-white">
        <div className="mb-8 w-full md:w-1/3 p-6 bg-white bg-opacity-10 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6">Signyard</h1>
          <p className="text-lg mb-4">
            Signyard is your premier destination for custom signs and banners.
            We offer high-quality signage solutions for businesses, events, and
            more.
          </p>
        </div>
        <div className="w-full md:w-1/3 mb-8 p-6 bg-white bg-opacity-10 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <div className="flex items-center mb-4">
            <FiMapPin className="mr-4 text-2xl" />
            <p>201, Plot No. 419 & 420 Shanti Nagar, Gurugram, 122001</p>
          </div>
          <div className="flex items-center mb-4">
            <FiMail className="mr-4 text-2xl" />
            <p>hello@signyard.com</p>
          </div>
          <div className="flex items-center mb-4">
            <FiPhone className="mr-4 text-2xl" />
            <p>9205778814</p>
          </div>
        </div>
        <div className="w-full md:w-1/3 mb-8 p-6 bg-white bg-opacity-10 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-6">
            <a
              href="#"
              className="hover:text-[#ff80b5] transition duration-300 transform hover:scale-110"
            >
              <FiFacebook className="h-8 w-8" />
            </a>
            <a
              href="#"
              className="hover:text-[#ff80b5] transition duration-300 transform hover:scale-110"
            >
              <FiTwitter className="h-8 w-8" />
            </a>
            <a
              href="#"
              className="hover:text-[#ff80b5] transition duration-300 transform hover:scale-110"
            >
              <FiInstagram className="h-8 w-8" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
