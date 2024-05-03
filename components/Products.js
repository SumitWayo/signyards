import { useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "../pages/context/Cartcontext";
import product from "../public/data/product";

const Products = () => {
  const { cartItems, addToCart } = useCart();
  const router = useRouter();
  console.log(cartItems);

  const handleAddToCart = (productId) => {
    addToCart(productId);
    console.log(`Product with ID ${productId} added to cart`);
    router.push("/cart");
  };

  return (
    <div id="products">
      <div className="relative bg-gray-800 sm:w-[calc(100%)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
            {product.map((product) => (
              <div key={product.id} className="group block">
                <div className="aspect-w-1 aspect-h-1 sm:aspect-h-8 sm:aspect-w-7">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="object-cover object-center w-full h-full group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-100">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-400">
                  ₹{product.price}
                </p>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {cartItems.find((item) => item.id == product.id)
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

export default Products;
