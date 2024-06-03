import { useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "../pages/context/Cartcontext";
import productData from "../public/data/product";
import Link from "next/link";

const productScreen = () => {
  const { cartItems, addToCart } = useCart();
  const router = useRouter();
  const [filter, setFilter] = useState("all"); // State for filtering

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

  const handleProductScreen = () => {
    router.push("/productScreen");
  };

  // Filter products based on the selected filter
  const filteredProducts = productData.filter((product) => {
    if (filter === "services") return product.price === 0;
    if (filter === "products") return product.price > 0;
    return true; // If 'all', return all products
  });

  return (
    <div id="products">
      <div className="relative bg-gray-800 sm:w-[calc(100%)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex justify-between mb-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="services">Services</option>
              <option value="products">Products</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
            {filteredProducts.slice(0, 20).map((product) => (
              <div key={product.id} className="group block relative">
                <div className="aspect-w-1 aspect-h-1 sm:aspect-h-8 sm:aspect-w-7">
                  <Link legacyBehavior href={`/products/${product.id}`}>
                    <a>
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="object-cover object-center w-full h-full group-hover:opacity-75 cursor-pointer"
                      />
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
                <h3 className="mt-4 text-sm text-gray-100">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-400">
                  ₹{product.price}
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
        </div>
      </div>
    </div>
  );
};

export default productScreen;
