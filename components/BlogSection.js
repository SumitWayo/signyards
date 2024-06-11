import Image from "next/image";

function MainBlogPage() {
  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-yellow-400">
          Signyards Blog
        </h1>

        <div className="mb-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-4">
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">
              Quality Signage Solutions
            </h2>
            <p className="mb-4">
              We at signyards use best quality raw materials to provide quality
              signboards. Our manufacturer’s workshop team can fabricate your
              signages and help you mount them on your store!
            </p>
            <p className="mb-4">
              We specialize in various signage types fabricated in our Gurgaon
              workshop.
            </p>
          </div>
          <div className="md:w-1/2 md:pl-4">
            <img
              className="w-full h-auto rounded-lg shadow-lg"
              src="/assets/Blog1.jpg"
              alt="Signage Example"
              width={800}
              height={600}
            />
          </div>
        </div>

        <div className="mb-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-4">
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">
              Full Acrylic Box Signage
            </h2>
            <p className="mb-4">
              Full Acrylic box backlit illuminated signage is unique and similar
              to flex backlit signboards, made using 5mm acrylic with IP 65
              grade LED modules for durable lighting.
            </p>
          </div>
          <div className="md:w-1/2 md:pl-4">
            <img
              className="w-full h-auto rounded-lg shadow-lg"
              src="/assets/Blog3.jpg"
              alt="Signage Example"
              width={800}
              height={600}
            />
          </div>
        </div>

        <div className="mb-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-4">
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">
              3D Illuminated Letters
            </h2>
            <p className="mb-4">
              3D Aluminium channel front acrylic illuminated letters feature
              liquid acrylic faces with aluminum strips, suitable for outdoor
              use with a long lifespan.
            </p>
          </div>
          <div className="md:w-1/2 md:pl-4">
            <img
              className="w-full h-auto rounded-lg shadow-lg"
              src="/assets/Blog2.jpg"
              alt="Signage Example"
              width={800}
              height={600}
            />
          </div>
        </div>

        <div className="mb-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-4">
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">
              Our Expertise and Future Plans
            </h2>
            <p className="mb-4">
              We've been fabricating quality LED signages for brands for the
              past seven years under Ayaan Sales. Our integrated web portal
              (www.signyards.com) will make it easy to find signage products and
              services.
            </p>
          </div>
          <div className="md:w-1/2 md:pl-4">
            <img
              className="w-full h-auto rounded-lg shadow-lg"
              src="/assets/Blog5.jpg"
              alt="Signage Example"
              width={800}
              height={600}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBlogPage;
