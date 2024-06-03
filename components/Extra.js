import React, { useState } from "react";

const CustomSignageForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    address: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://signyards.in/getCustomSignageData.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const text = await response.text();
      console.log("Raw response text:", formData);

      if (!response.ok) {
        throw new Error(`Error submitting form: ${response.statusText}`);
      }

      if (text.trim() === "") {
        console.log("Empty response received");
        setSubmissionStatus(
          "API response: Data sent successfully, but received an empty response from the server."
        );
      } else {
        try {
          const result = JSON.parse(text);
          console.log("Parsed JSON response:", result);
          setSubmissionStatus("API response: Data sent successfully!");
        } catch (error) {
          console.error("Failed to parse JSON response:", error);
          console.log("Response text:", text);
          setSubmissionStatus(
            "API response: Data sent, but response parsing failed."
          );
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("Error submitting form.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Number:
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {submissionStatus && <p>{submissionStatus}</p>}
    </div>
  );
};

export default CustomSignageForm;
