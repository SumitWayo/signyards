import React, { useState, useEffect } from "react";
import { useCart } from "./context/Cartcontext";
import Modal from "../components/Modal";
import OrderDetailForm from "../components/OrderDetailForm";
import OrderSummary from "../components/OrderSummary"; // Import OrderSummary component

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://signyards.in/getProducts.php");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProductsData(data);
        setLoadingProducts(false);
      } catch (error) {
        setErrorProducts(error.message);
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const totalValue = cartItems.reduce((acc, item) => {
    const product = productsData.find((p) => p.id === item.id);
    return acc + (product ? Number(product.price_per_unit) * item.quantity : 0);
  }, 0);

  const handleBuyClick = () => {
    setShowModal(true);
  };

  const handleSubmitOrder = async (formData) => {
    setIsSubmitting(true);
    try {
      const orderProducts = cartItems.map((item) => {
        const product = productsData.find((p) => p.id === item.id);
        return {
          product: product || {
            id: item.id,
            name: "Unknown Product",
            price: 0,
            imageSrc: "", // Provide default values if product is not found
          },
          quantity: item.quantity,
        };
      });
      setOrderData(orderProducts);

      const response = await fetch("https://signyards.in/getOrder.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          orderData: orderProducts,
        }),
      });

      const text = await response.text(); // Get raw response text

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${text}`);
      }

      let result;
      try {
        result = JSON.parse(text); // Attempt to parse JSON if response is not empty
      } catch (error) {
        if (text) {
          throw new Error(`Error parsing JSON response: ${error.message}`);
        } else {
          result = {}; // Set to empty object if response body is empty
        }
      }

      console.log("Order submitted successfully:", result);

      // Clear the cart upon successful order submission
      clearCart();

      // Set formData to display the summary
      setFormData(formData);
      setShowModal(true); // Show modal after order submission
    } catch (error) {
      console.error("Error submitting order:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://signyards.in/getOrder.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          orderData,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Order confirmed successfully:", result);

      // Clear the cart upon successful order confirmation
      clearCart();
      setShowModal(false); // Close modal after confirmation
    } catch (error) {
      console.error("Error confirming order:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-2xl font-bold mb-8">Cart</h1>
      <div className="flex flex-col space-y-4">
        {loadingProducts ? (
          <div>Loading products...</div>
        ) : errorProducts ? (
          <div>Error: {errorProducts}</div>
        ) : cartItems.length > 0 ? (
          cartItems.map((item) => {
            const product = productsData.find((p) => p.id === item.id);
            if (!product) {
              return (
                <div
                  key={item.id}
                  className="bg-red-100 p-4 shadow-md rounded-lg"
                >
                  <p>
                    Product details unavailable for ID: {item.id}. This item may
                    have been removed.
                  </p>
                </div>
              );
            }
            const totalPrice = Number(product.price_per_unit) * item.quantity;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`data:image/jpeg;base64,${product.imageBase64}`}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <div className="text-lg font-medium">{product.title}</div>
                    <div className="flex items-center">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="px-2 py-1 border rounded text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-lg font-medium text-gray-700">
                  ₹{totalPrice}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500">Your cart is empty.</div>
        )}
        {cartItems.length > 0 && (
          <div className="flex justify-between items-center mt-8">
            <div className="p-4 bg-gray-100 rounded-lg shadow-md w-auto">
              <h2 className="text-lg font-bold">Total: ₹{totalValue}</h2>
            </div>
            <button
              onClick={handleBuyClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
            >
              Buy
            </button>
          </div>
        )}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {orderData && formData ? (
            <OrderSummary
              orderData={orderData}
              formData={formData}
              onConfirm={handleConfirmOrder}
            />
          ) : (
            <OrderDetailForm onSubmit={handleSubmitOrder} />
          )}
        </Modal>
      )}
      {isSubmitting && <p>Submitting order...</p>}
    </div>
  );
};

export default Cart;
