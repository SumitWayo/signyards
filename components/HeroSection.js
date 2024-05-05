import { useState } from "react";

const HeroSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Set errors for character limits directly in input handling
    if (name !== "pincode" && name !== "phone" && value.length > 30) {
      setErrors((prev) => ({
        ...prev,
        [name]: `${
          name.charAt(0).toUpperCase() +
          name.slice(1).replace(/([A-Z])/g, " $1")
        } must be 30 characters or less`,
      }));
    } else if (
      name === "pincode" &&
      (value.length > 6 || isNaN(Number(value)))
    ) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Pincode must be exactly 6 digits",
      }));
    } else if (
      name === "phone" &&
      (value.length > 10 || isNaN(Number(value)))
    ) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Phone number must be exactly 10 digits",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    // Required fields validation
    ["name", "addressLine1", "city", "state", "phone", "pincode"].forEach(
      (field) => {
        if (!formData[field]) {
          newErrors[field] = `${
            field.charAt(0).toUpperCase() +
            field.slice(1).replace(/([A-Z])/g, " $1")
          } is required`;
        }
      }
    );

    // Additional specific validations
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
      console.log("Form data:", formData);
      setFormSubmitted(true); // Indicate submission was successful
      setShowForm(false); // Hide form
      // Further processing here
    }
  };

  return (
    <div>
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-38 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-500 sm:text-6xl">
              Indoor & Outdoor Retail Signage Solutions
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Attractive signs (both digital & static) are memorable and cause
              an emotional reaction in customers. Customers use these graphics
              to decide whether a shop is the right fit for them before ever
              walking through the door.
            </p>
            {!formSubmitted && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                MAKE YOUR CUSTOM SIGNAGE
              </button>
            )}
            {showForm && (
              <form onSubmit={handleSubmit} className="w-full rounded-md py-2 ">
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
            {formSubmitted && (
              <div className="mt-6 text-lg text-indigo-600">
                Thank you for showing interest. Our customer executive will
                connect with you shortly.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
