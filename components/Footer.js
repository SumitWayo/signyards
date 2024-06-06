import React from "react";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiArchive,
  FiTrendingDown,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between">
        <div className="mb-8 w-full md:w-1/3 p-6 bg-white bg-opacity-10 ">
          <h1 className="text-4xl text-yellow-400 font-bold mb-6 ">
            Signyards
          </h1>
          <p className="text-lg mb-4 text-white ">
            Signyard is your premier destination for custom signs and banners.
            We offer high-quality signage solutions for businesses, events, and
            more.
          </p>
        </div>
        <div className="w-full md:w-1/3 mb-8 p-6 bg-white bg-opacity-10 ">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            Contact Us
          </h2>
          {/* <div className="flex items-center mb-4">
            <FiMapPin className="mr-4 text-2xl" />
            <p>201, Plot No. 419 & 420 Shanti Nagar, Gurugram, 122001</p>
          </div> */}
          <div className="flex items-center mb-4">
            <FiMail className="mr-4 text-2xl text-white" />
            <p className="text-white">hello@signyards.com</p>
          </div>
          <div className="flex items-center mb-4">
            <FiPhone className=" text-white mr-4 text-2xl" />
            <p className="text-white">9205778814</p>
          </div>
          <div className="flex items-center mb-4">
            <FiArchive className=" text-white mr-4 text-2xl" />
            <p className="text-white">Privacy policy</p>
          </div>
          <div className="flex items-center mb-4">
            <FiTrendingDown className=" text-white mr-4 text-2xl" />
            <p className="text-white">Terms & Conditions</p>
          </div>
        </div>
        <div className="w-full md:w-1/3 mb-8 p-6 bg-white bg-opacity-10 ">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Follow Us</h2>
          <div className="flex space-x-6">
            <a
              href="#"
              className="hover:text-[#ff8] transition duration-300 transform hover:scale-110"
            >
              <FiFacebook className="h-8 w-8 text-white" />
            </a>
            <a
              href="https://www.instagram.com/signyards?igsh=enJxMzE0Zjc4cGNr"
              className="hover:text-[#ff8] transition duration-300 transform hover:scale-110"
            >
              <FiInstagram className="h-8 w-8 text-white" />
            </a>
            <a
              href="https://www.linkedin.com/company/signyards/"
              className="hover:text-[#ff8] transition duration-300 transform hover:scale-110"
            >
              <FiLinkedin className="h-8 w-8 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
