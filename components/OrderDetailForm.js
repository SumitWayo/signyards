import React, { useState } from "react";

const OrderDetailForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    pincode: "",
    landmark: "",
    state: "",
    phone: "",
    gstNumber: "", // Add GST number to the formData state
  });
  const [errors, setErrors] = useState({});
  const [orderData, setOrderData] = useState(null); // State to store order data

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null })); // Clear errors when the user types
  };

  const validateForm = () => {
    let newErrors = {};
    // Basic validation: Check required fields
    ["name", "addressLine1", "city", "state", "phone", "pincode"].forEach(
      (field) => {
        if (!formData[field]) {
          newErrors[field] = `${
            field[0].toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")
          } is required`;
        }
      }
    );

    // Validate pincode and phone for exact length and numeric value
    if (
      formData.pincode &&
      (formData.pincode.length !== 6 || isNaN(Number(formData.pincode)))
    ) {
      newErrors.pincode = "Pincode must be exactly 6 digits";
    }
    if (
      formData.phone &&
      (formData.phone.length !== 10 || isNaN(Number(formData.phone)))
    ) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // Validate GST number format (assuming Indian GST format for example purposes)
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/;
    if (formData.gstNumber && !gstRegex.test(formData.gstNumber)) {
      newErrors.gstNumber = "Invalid GST number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Assuming onSubmit returns the complete order data
      const orderData = await onSubmit(formData);
      setOrderData(orderData);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full rounded-md py-2">
        {[
          "name",
          "addressLine1",
          "addressLine2",
          "landmark",
          "city",
          "pincode",
          "state",
          "phone",
          "gstNumber", // Include gstNumber in the fields to render
        ].map((field) => (
          <div key={field} className="w-full mb-4">
            <input
              type="text"
              name={field}
              placeholder={
                field.charAt(0).toUpperCase() +
                field.slice(1).replace(/([A-Z])/g, " $1")
              }
              value={formData[field]}
              onChange={handleInputChange}
              className={`px-4 py-2 border rounded-md w-full ${
                errors[field] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[field] && (
              <p className="text-red-500 text-sm">{errors[field]}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-500"
        >
          Submit
        </button>
      </form>
      {orderData && (
        <div>
          <h2>Order Details</h2>
          <p>Product Name: {orderData.productName}</p>
          <p>Order Price: {orderData.orderPrice}</p>
          <h3>Customer Information</h3>
          <p>Name: {orderData.customerName}</p>
          <p>
            Address: {orderData.addressLine1}, {orderData.addressLine2},{" "}
            {orderData.landmark}, {orderData.city}, {orderData.state},{" "}
            {orderData.pincode}
          </p>
          <p>Phone: {orderData.phone}</p>
          {orderData.gstNumber && <p>GST Number: {orderData.gstNumber}</p>}
          {/* Display other form information here if needed */}
        </div>
      )}
    </div>
  );
};

export default OrderDetailForm;
