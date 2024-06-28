import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCart } from "./context/Cartcontext";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SkeletonLoader = () => (
  <div className="shadow rounded-md p-4 max-w-sm w-full mx-auto">
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

const Products = ({ products = [] }) => {
  const { cartItems, addToCart } = useCart();
  const router = useRouter();
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  const handleButtonClick = (product) => {
    const isInCart = cartItems.find((item) => item.id === product.id);
    if (isInCart) {
      router.push("/cart");
    } else {
      addToCart(product.id);
      console.log(`Product with ID ${product.id} added to cart`);
    }
  };

  const handleProductRedirect = (product) => {
    router.push({
      pathname: `/products/${product.id}`,
      query: { data: JSON.stringify(product) },
    });
  };

  const handleProductScreen = () => {
    router.push("/productScreen");
  };

  // Filter only products with type "Product"
  const filteredProducts = products.filter(
    (product) => product.type === "Product"
  );

  // Displayed products based on the state, limited to 4 products
  const displayedProducts = showAllProducts
    ? filteredProducts
    : filteredProducts.slice(0, 4);

  if (loading) {
    return (
      <div
        id="products"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8"
      >
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
      </div>
    );
  }

  return (
    <div id="products">
      <div className="relative bg-gray-800 sm:w-[calc(100%)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
            {displayedProducts.map((product) => (
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
                          loading="lazy"
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
          {!showAllProducts && filteredProducts.length > 3 && (
            <div className="absolute bottom-4 right-4">
              <button
                onClick={handleProductScreen}
                className="flex items-center px-4 py-2 text-yellow-400 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                More <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
