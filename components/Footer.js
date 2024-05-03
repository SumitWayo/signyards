import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 py-8 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between">
          <div className="mb-8 w-full md:w-auto">
            <h1 className="text-2xl font-bold text-black mb-4">Signyard</h1>
            <p className="text-black opacity-90">
              Signyard is your premier destination for custom signs
            </p>
            <p className="text-black opacity-90">
              and banners. We offer high-quality signage solutions for
            </p>
            <p className="text-black opacity-90">
              businesses, events, and more.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <h2 className="text-xl font-bold text-black mb-4">Contact Us</h2>
            <p className="text-black opacity-90">
              201, Plot No. 419 & 420 Shanti Nagar,
            </p>
            <p className="text-black opacity-90"> Gurugram, 122001</p>
            <p className="text-black pacity-90">hell0@signyard.com</p>
            <p className="text-black opacity-90">9205778814</p>
          </div>
          <div className="w-full md:w-auto">
            <h2 className="text-xl font-bold text-black mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-black hover:text-white transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-black hover:text-white transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-black hover:text-white transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.293 6.707a2 2 0 00-2.828 0L12 9.172l-2.465-2.465a2 2 0 00-2.828 2.828L9.172 12l-2.465 2.465a2 2 0 102.828 2.828L12 14.828l2.465 2.465a2 2 0 002.828-2.828L14.828 12l2.465-2.465a2 2 0 000-2.828z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
