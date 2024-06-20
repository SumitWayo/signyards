import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const OrderSummary = ({ orderData, formData, onConfirm }) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const totalOrderValue = orderData.reduce(
    (acc, item) => acc + item.quantity * item.product.price_per_unit,
    0
  );

  const handleConfirm = () => {
    // Perform any necessary actions (e.g., API calls) and then set orderConfirmed to true
    // Example:
    // onConfirm().then(() => setOrderConfirmed(true));
    setOrderConfirmed(true); // Simpler example assuming synchronous confirmation
  };

  return (
    <div
      className={`p-6 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto ${
        orderConfirmed ? "bg-green-100" : ""
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      {orderData.map((item, index) => (
        <div key={index} className="flex items-center mb-4">
          <img
            src={`data:image/jpeg;base64,${item.product.imageBase64}`}
            alt={item.product.title}
            className="w-20 h-20 object-cover rounded-md mr-4"
          />
          <div>
            <p className="text-lg font-medium">{item.product.title}</p>
            <p>
              Quantity: {item.quantity} | Price per unit: ₹
              {item.product.price_per_unit} | Total: ₹
              {item.quantity * item.product.price_per_unit}
            </p>
          </div>
        </div>
      ))}
      <div className="border-t border-gray-200 mt-4 pt-4">
        <h3 className="text-xl font-bold">Customer Information</h3>
        <p>Name: {formData.name}</p>
        <p>
          Address: {formData.addressLine1}, {formData.addressLine2}
        </p>
        <p>City: {formData.city}</p>
        <p>State: {formData.state}</p>
        <p>Pincode: {formData.pincode}</p>
        <p>Phone: {formData.phone}</p>
        <p>GST Number: {formData.gstNumber}</p>
      </div>
      <div className="border-t border-gray-200 mt-4 pt-4">
        <h3 className="text-xl font-bold">Total Order Value</h3>
        <p className="text-lg font-medium">₹{totalOrderValue}</p>
      </div>
      {orderConfirmed && (
        <div className="flex items-center mt-4 text-green-600">
          <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
          <span>
            Order successfully confirmed. Our team will call you soon.
          </span>
        </div>
      )}
      {!orderConfirmed && (
        <button
          onClick={handleConfirm}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md w-full"
        >
          Confirm Order
        </button>
      )}
    </div>
  );
};

export default OrderSummary;
