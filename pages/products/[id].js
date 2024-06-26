import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../../components/context/Cartcontext";
import Products from "@/components/Products";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { cartItems, addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const mainImageRef = useRef(null);
  const magnifierRef = useRef(null);

  useEffect(() => {
    if (id) {
      const requestData = {
        product: {
          id: id,
        },
      };

      fetch("https://signyards.in/getProductById.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok: ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setProduct(data[0]);
          } else {
            throw new Error("Product not found in fetched data");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
          setError(`Error fetching product data: ${error.message}`);
          setLoading(false);
        });
    }
  }, [id]);

  const handleButtonClick = (product) => {
    const isInCart = cartItems.find((item) => item.id === product.id);
    if (isInCart) {
      router.push("/cart");
    } else {
      addToCart(product.id);
      console.log(`Product with ID ${product.id} added to cart`);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = mainImageRef.current;
    const x = (offsetX / offsetWidth) * 100;
    const y = (offsetY / offsetHeight) * 100;
    magnifierRef.current.style.backgroundPosition = `${x}% ${y}%`;
    magnifierRef.current.style.left = `${
      offsetX - magnifierRef.current.offsetWidth / 2
    }px`;
    magnifierRef.current.style.top = `${
      offsetY - magnifierRef.current.offsetHeight / 2
    }px`;
  };

  const handleMouseEnter = () => {
    magnifierRef.current.style.display = "block";
  };

  const handleMouseLeave = () => {
    magnifierRef.current.style.display = "none";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row p-4 shadow-lg rounded-lg bg-white">
        <div className="w-full md:w-1/2 p-4">
          {product.imageBase64 && product.imageBase64.length > 0 ? (
            <>
              <div
                className="main-image-container mb-4 relative"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={mainImageRef}
              >
                <img
                  src={`data:image/jpeg;base64,${product.imageBase64[currentImageIndex]}`}
                  alt={product.title}
                  className="main-image w-full h-96 object-cover rounded-lg shadow-md"
                />
                <div
                  ref={magnifierRef}
                  className="magnifier hidden absolute w-40 h-40 rounded-full border-2 border-gray-400 bg-no-repeat bg-contain pointer-events-none"
                  style={{
                    backgroundImage: `url(data:image/jpeg;base64,${product.imageBase64[currentImageIndex]})`,
                  }}
                ></div>
              </div>
              <div className="thumbnail-container flex justify-center mt-4 space-x-2">
                {product.imageBase64.map((image, index) => (
                  <img
                    key={index}
                    src={`data:image/jpeg;base64,${image}`}
                    alt={`Thumbnail ${index}`}
                    className={`thumbnail w-20 h-20 object-cover rounded-md cursor-pointer border ${
                      currentImageIndex === index
                        ? "border-indigo-600"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleImageClick(index)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div>No images available</div>
          )}
        </div>
        <div className="flex-grow md:w-1/2 md:pl-8 p-4">
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-gray-800 mb-4">
            Price: ₹{product.price_per_unit}
          </p>
          {showFullDescription ? (
            <p className="text-gray-700 mb-4">{product.description}</p>
          ) : (
            <p className="text-gray-700 mb-4">
              {product.description.split("\n").slice(0, 2).join("\n")}
            </p>
          )}
          {product.description.split("\n").length > 2 && (
            <button
              onClick={toggleDescription}
              className="mt-4 px-4 py-2 text-indigo-600 text-sm font-medium rounded-md border border-indigo-600 hover:bg-indigo-50"
            >
              {showFullDescription ? "Show less" : "More details"}
            </button>
          )}
          <button
            onClick={() => handleButtonClick(product)}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-2"
          >
            {cartItems.find((item) => item.id === product.id)
              ? "Go to Cart"
              : "Add to Cart"}
          </button>
        </div>
      </div>
      <Products />
    </div>
  );
};

export default ProductDetail;
