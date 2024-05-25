import React, { useState } from "react";

const CustomSignageForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    pincode: "",
    landmark: "",
    state: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full rounded-md py-2">
      {submitted ? (
        <p className="text-green-500 text-lg">
          Our customer executive will connect shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          {[
            "name",
            "addressLine1",
            "addressLine2",
            "landmark",
            "city",
            "pincode",
            "state",
            "phone",
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
      )}
    </div>
  );
};

export default CustomSignageForm;
