import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCart } from "../pages/context/Cartcontext";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Products = () => {
  const { cartItems, addToCart } = useCart();
  const router = useRouter();
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://signyards.in/getProducts.php");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // empty dependency array means this effect runs once on mount
  console.log(products);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter only products with type "Product"
  const filteredProducts = products.filter(
    (product) => product.type === "Product"
  );

  // Displayed products based on the state, limited to 8 products
  const displayedProducts = showAllProducts
    ? filteredProducts
    : filteredProducts.slice(0, 8);

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
          {!showAllProducts && filteredProducts.length > 8 && (
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
