import { useState } from "react";
import { useCart } from "./context/Cartcontext";
import products from "../public/data/product";
import Modal from "../components/Model";
import OrderDetailForm from "../components/OrderDetailForm";

const OrderSummary = ({ orderData, formData }) => {
  return (
    <div>
      <h2>Order Summary</h2>
      <p>Quantity: {formData.quantity}</p>
      {/* Display form information */}
      <h3>Customer Information</h3>
      <p>Name: {formData.name}</p>
      <p>
        Address: {formData.addressLine1}, {formData.addressLine2}
      </p>
      <p>City: {formData.city}</p>
      <p>State: {formData.state}</p>
      <p>Pincode: {formData.pincode}</p>
      <p>Phone: {formData.phone}</p>
      <p>GST Number: {formData.gstNumber}</p>
      {/* Add other form fields as needed */}
    </div>
  );
};

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity } = useCart();
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [orderData, setOrderData] = useState(null); // State to store order details
  const [formData, setFormData] = useState(null); // State to store form data

  // Calculate the total value of the cart
  const totalValue = cartItems.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.id);
    return acc + (product ? product.price * item.quantity : 0);
  }, 0);

  // Function to handle modal visibility
  const handleBuyClick = () => {
    setShowModal(true);
  };

  // Function to handle form submission
  const handleSubmitOrder = async (formData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Store form data and order details in component state
      setFormData(formData);
      const orderProducts = cartItems.map((item) => {
        const product = products.find((p) => p.id === item.id);
        return {
          product: product, // or shorthand: product,
          quantity: item.quantity,
        };
      });
      setOrderData(orderProducts);
    } catch (error) {
      console.error("Error submitting order:", error.message);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-2xl font-bold mb-8">Cart</h1>
      <div className="flex flex-col space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            const product = products.find((p) => p.id === item.id);
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
            const totalPrice = product.price * item.quantity;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt || "Product Image"}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <div className="text-lg font-medium">{product.name}</div>
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
              onClick={handleBuyClick} // Open modal when Buy button is clicked
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
            <OrderSummary orderData={orderData} formData={formData} />
          ) : (
            <OrderDetailForm onSubmit={handleSubmitOrder} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Cart;
