import React from "react";
import {
  FiMail,
  FiPhone,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiArchive,
  FiTrendingDown,
} from "react-icons/fi";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between">
        <div className="mb-8 w-full md:w-1/3 p-6 bg-white bg-opacity-10">
          <h1 className="text-4xl text-yellow-400 font-bold mb-6">Signyards</h1>
          <p className="text-lg mb-4 text-white">
            Signyards in an online marketplace for signage and advertising
            solutions in India. We offer high-quality signage options for
            businesses, events and more.
          </p>
        </div>
        <div className="w-full md:w-1/3 mb-8 p-6 bg-white bg-opacity-10">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            Contact Us
          </h2>
          <div className="flex items-center mb-4">
            <FiMail className="mr-4 text-2xl text-white" />
            <p className="text-white">hello@signyards.com</p>
          </div>
          <div className="flex items-center mb-4">
            <FiPhone
              className="text-white
             mr-4 text-2xl"
            />
            <p className="text-white">9205778814</p>
          </div>
          <div className="space-x-2 text-sm items-center">
            <Link legacyBehavior href="/blogs">
              <a className="text-white border-white underline">Blogs</a>
            </Link>
            <Link legacyBehavior href="/privacy-policy">
              <a className="text-white border-white underline">
                Privacy Policy
              </a>
            </Link>
            <Link legacyBehavior href="/terms-and-conditions">
              <a className="text-white border-white underline">
                Terms & Conditions
              </a>
            </Link>

            {/* <Link legacyBehavior href="/about-us">
              <a className="text-white border-white underline">AboutUs</a>
            </Link> */}
            <Link legacyBehavior href="/faqs">
              <a className="text-white border-white underline">FAQs</a>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/3 mb-8 p-6 bg-white bg-opacity-10">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Follow Us</h2>
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/profile.php?id=61560404651489"
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
