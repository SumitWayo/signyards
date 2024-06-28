import { useState, useEffect } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RequestCallBackForm from "@/components/RequestCallBackForm";
import { FaTimes } from "react-icons/fa";

const SkeletonLoader = () => (
  <div className=" shadow rounded-md p-4 max-w-sm w-full mx-auto">
    <div className="animate-pulse">
      <div className="aspect-w-1 aspect-h-1 sm:aspect-h-8 sm:aspect-w-7">
        <div className="w-full h-64 bg-slate-100"></div>
      </div>
      <div className="mt-4">
        <div className="h-4 bg-slate-100 rounded w-3/4"></div>
        <div className="h-4 bg-slate-100 rounded w-1/4 mt-2"></div>
      </div>
      <div className="mt-2">
        <div className="h-8 bg-slate-100 rounded w-full"></div>
      </div>
    </div>
  </div>
);

const ServiceScreen = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [services, setServices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("https://signyards.in/getProducts.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: "services",
            page_number: 1,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.length > 0) {
          setServices(data); // Assuming data is an array of services
        } else {
          console.error("No services found in API response:", data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const ProductModal = ({ product, onClose, onSubmit }) => {
    if (!product) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full md:max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            <FaTimes className="h-6 w-6" />
          </button>

          <div className="p-4 overflow-y-auto max-h-screen">
            <img
              src={`data:image/jpeg;base64,${product.imageBase64}`}
              alt={product.title}
              className="object-cover object-center w-full h-24 md:h-32"
            />
            <h3 className="mt-4 text-lg font-bold text-gray-900">
              {product.title}
            </h3>
            <p className="mt-2 text-md font-medium text-yellow-500">Service</p>
            <p className="mt-2 text-sm text-gray-700">{product.description}</p>
            <RequestCallBackForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    );
  };

  const handleRequestCall = (product) => {
    setSelectedProduct(product);
  };

  const handleServiceScreen = () => {
    router.push("/ServiceScreen");
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (!selectedProduct) {
        throw new Error("No product selected."); // Handle case where no product is selected
      }

      // Wrap formData inside a formData key and include product id and title
      const dataToSend = {
        formData: {
          ...formData,
          productId: selectedProduct.id,
          productTitle: selectedProduct.title,
        },
      };

      const response = await fetch("https://signyards.in/getOrder.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);

      handleCloseModal();

      return data;
    } catch (error) {
      console.error("Error submitting form:", error);
      // alert("Error submitting form. Please try again later.");
    }
  };

  if (services.length === 0) {
    return (
      <div id="services">
        <div className="relative bg-gray-800 sm:w-[calc(100%)]">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <SkeletonLoader key={index} />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="services">
      <div className="relative bg-gray-800 sm:w-[calc(100%)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
            {services.map((product) => (
              <div
                key={product.id}
                className="group block relative cursor-pointer"
                onClick={() => handleRequestCall(product)}
              >
                <div className="aspect-w-1 aspect-h-1 sm:aspect-h-8 sm:aspect-w-7">
                  <div className="w-full h-64 bg-gray-200">
                    <img
                      src={`data:image/jpeg;base64,${product.imageBase64}`}
                      alt={product.title}
                      className="object-cover object-center w-full h-full group-hover:opacity-75"
                    />
                  </div>
                </div>
                <h3 className="mt-4 text-sm text-gray-100">{product.title}</h3>
                <p className="mt-1 text-lg font-medium text-yellow-400">
                  Service
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRequestCall(product);
                  }}
                  className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Request a Call Back
                </button>
              </div>
            ))}
          </div>

          {/* <div className="absolute bottom-4 right-4">
            <button
              onClick={handleServiceScreen}
              className="flex items-center px-4 py-2 text-yellow-400 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              More <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </button>
          </div> */}
        </div>
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default ServiceScreen;
