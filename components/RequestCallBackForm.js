import React, { useState } from "react";

const states = ["Delhi NCR", "Haryana"];
const cities = {
  "Delhi NCR": ["Delhi"],
  Haryana: ["Gurugram"],
};

const RequestCallBackForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    type: "service",
  });
  const [errors, setErrors] = useState({});
  const [orderData, setOrderData] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));

    if (name === "state") {
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    ["name", "city", "state", "phone"].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${
          field[0].toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")
        } is required`;
      }
    });

    if (
      formData.phone &&
      (formData.phone.length !== 10 || isNaN(Number(formData.phone)))
    ) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const orderData = await onSubmit(formData);
      setOrderData(orderData);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="w-full rounded-md py-2">
        {["name", "phone"].map((field) => (
          <div key={field} className="w-full mb-2">
            <input
              type="text"
              name={field}
              placeholder={
                field.charAt(0).toUpperCase() +
                field.slice(1).replace(/([A-Z])/g, " $1")
              }
              value={formData[field]}
              onChange={handleInputChange}
              className={`px-2 py-1 border rounded-md w-full text-sm ${
                errors[field] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[field] && (
              <p className="text-red-500 text-xs">{errors[field]}</p>
            )}
          </div>
        ))}
        <div className="w-full mb-2">
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className={`px-2 py-1 border rounded-md w-full text-sm ${
              errors.state ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="text-red-500 text-xs">{errors.state}</p>
          )}
        </div>
        <div className="w-full mb-2">
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            disabled={!formData.state}
            className={`px-2 py-1 border rounded-md w-full text-sm ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select City</option>
            {formData.state &&
              cities[formData.state].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
          {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 py-1 text-white text-sm hover:bg-indigo-500"
        >
          Submit
        </button>
      </form>
      {orderData && (
        <div className="mt-4">
          <h2 className="text-lg">Order Details</h2>
          <p>Product Name: {orderData.productName}</p>
          <p>Order Price: {orderData.orderPrice}</p>
          <h3 className="text-md">Customer Information</h3>
          <p>Name: {orderData.customerName}</p>
          <p>
            Address: {orderData.addressLine1}, {orderData.addressLine2},{" "}
            {orderData.landmark}, {orderData.city}, {orderData.state},{" "}
            {orderData.pincode}
          </p>
          <p>Phone: {orderData.phone}</p>
          {orderData.gstNumber && <p>GST Number: {orderData.gstNumber}</p>}
        </div>
      )}
    </div>
  );
};

export default RequestCallBackForm;
