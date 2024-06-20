import Link from "next/link";

function AboutUsSection() {
  return (
    <Link legacyBehavior href="/about-us">
      <div className="flex flex-col lg:flex-row items-center bg-white p-6 rounded-lg shadow-lg hover">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
          <img
            className="w-full h-auto rounded-lg shadow-lg"
            src="/assets/about.png"
            alt="Company Logo"
          />
        </div>
        <div className="lg:w-1/2 w-full lg:pl-6">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400 hover:text-gray-400">
            About Signyards
          </h2>
          <p className="mb-4">
            <span className=" text-gray-800 text-xl p-2 rounded">
              Signyards.com is a web portal which connects the customer with the
              right Seller (signage manufacturer, fabricator and service
              provider). Signyards have partnered with Signage and advertising
              solutions provider companies across the country and empowered them
              to sell their products & Services on Signyards to the right
              customers.
            </span>
          </p>
          <p className="mb-4">
            <span className=" text-gray-800 text-xl p-2 rounded">
              We are building an online marketplace where you can find all
              products and services of the signage and advertising industry in
              4-5 clicks.
            </span>
          </p>
          <p className="mb-4">
            <strong>
              <span className="text-gray-800 p-2 rounded">Our Mission:</span>
            </strong>
            <span className=" text-gray-800 p-2 rounded">
              To become a single trustworthy online platform in the signage and
              advertising industry.
            </span>
          </p>
          <p className="mb-4">
            <strong>
              <span className="text-gray-800  p-2 rounded">Our Vision:</span>
            </strong>
            <span>
              To empower all genuine sellers to partner with Signyards and give
              better products & services at better rates to customers.
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default AboutUsSection;
