import React, { useState } from "react";

const states = ["Delhi NCR", "Haryana"];
const cities = {
  "Delhi NCR": ["Delhi"],
  Haryana: ["Gurugram"],
};

const OrderDetailForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "website",
    addressLine1: "",
    addressLine2: "",
    city: "",
    pincode: "",
    landmark: "",
    state: "",
    phone: "",
    gstNumber: "",
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
    ["name", "addressLine1", "city", "state", "phone", "pincode"].forEach(
      (field) => {
        if (!formData[field]) {
          newErrors[field] = `${
            field[0].toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")
          } is required`;
        }
      }
    );

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
      const orderData = await onSubmit(formData);
      setOrderData(orderData);
    }
  };

  return (
    <div className="mt-4 ">
      <form onSubmit={handleSubmit}>
        {[
          "name",
          "phone",
          "addressLine1",
          "addressLine2",
          "landmark",
          "pincode",
          "gstNumber",
        ].map((field) => (
          <div key={field} className="mb-4">
            <input
              type="text"
              name={field}
              placeholder={
                field.charAt(0).toUpperCase() +
                field.slice(1).replace(/([A-Z])/g, " $1")
              }
              value={formData[field]}
              onChange={handleInputChange}
              className={`px-3 py-2 border rounded-md w-full text-sm ${
                errors[field] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[field] && (
              <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
            )}
          </div>
        ))}
        <div className="mb-4">
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className={`px-3 py-2 border rounded-md w-full text-sm ${
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
            <p className="text-red-500 text-xs mt-1">{errors.state}</p>
          )}
        </div>
        <div className="mb-4">
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            disabled={!formData.state}
            className={`px-3 py-2 border rounded-md w-full text-sm ${
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
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 py-2 text-white text-sm hover:bg-indigo-500"
        >
          Submit
        </button>
      </form>
      {orderData && (
        <div className="mt-4 mx-auto p-4 max-w-lg overflow-y-auto">
          <h2 className="text-lg">Order Details</h2>
          <div className="bg-white rounded-lg shadow-md mt-4 p-4">
            <p className="mb-2 text-sm">
              <strong>Product Name:</strong> {orderData.productName}
            </p>
            <p className="mb-2 text-sm">
              <strong>Order Price:</strong> {orderData.orderPrice}
            </p>
            <h3 className="text-md mt-2 mb-2">
              <strong>Customer Information</strong>
            </h3>
            <p className="text-sm">
              <strong>Name:</strong> {orderData.customerName}
            </p>
            <p className="text-sm">
              <strong>Address:</strong> {orderData.addressLine1},{" "}
              {orderData.addressLine2}, {orderData.landmark}, {orderData.city},{" "}
              {orderData.state}, {orderData.pincode}
            </p>
            <p className="text-sm">
              <strong>Phone:</strong> {orderData.phone}
            </p>
            {orderData.gstNumber && (
              <p className="text-sm">
                <strong>GST Number:</strong> {orderData.gstNumber}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailForm;
