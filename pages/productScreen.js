import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "../components/context/Cartcontext";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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

const ProductScreen = () => {
  const { cartItems, addToCart } = useCart();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://signyards.in/getProducts.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: "product",
            page_number: currentPage,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.filter((product) => product.type === "Product")); // Filter products here
        setTotalPages(data.totalPages); // Assuming API returns totalPages
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]); // Fetch products whenever currentPage changes

  const handleButtonClick = (product) => {
    const isInCart = cartItems.find((item) => item.id === product.id);
    if (isInCart) {
      router.push("/cart");
    } else {
      addToCart(product.id);
      console.log(`Product with ID ${product.id} added to cart`);
    }
  };

  const handleProductRedirect = (productId) => {
    router.push(`/products/${productId}`);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return (
      <div id="productScreen">
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="productScreen">
      <div className="relative bg-gray-800 sm:w-[calc(100%)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
            {products.map((product) => (
              <div key={product.id} className="group block relative">
                <div className="aspect-w-1 aspect-h-1 sm:aspect-h-8 sm:aspect-w-7">
                  <Link
                    legacyBehavior
                    href={`/products/${product.id}`}
                    passHref
                  >
                    <a>
                      <div className="w-full h-64 bg-gray-200">
                        <img
                          src={`data:image/jpeg;base64,${product.imageBase64}`}
                          alt={product.title}
                          className="object-cover object-center w-full h-full group-hover:opacity-75 cursor-pointer"
                        />
                      </div>
                    </a>
                  </Link>
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => handleProductRedirect(product.id)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View
                    </button>
                  </div>
                </div>
                <h3 className="mt-4 text-sm text-gray-100">{product.title}</h3>
                <p className="mt-1 text-lg font-medium text-yellow-400">
                  ₹{product.price_per_unit}
                </p>
                <button
                  onClick={() => handleButtonClick(product)}
                  className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {cartItems.find((item) => item.id === product.id)
                    ? "Go to Cart"
                    : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="mr-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Previous
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="ml-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
