import React, { useState } from "react";
import { FormContainer } from "./BannerForm.style"; // Import styles
import { createBanner } from "../../../../../api/bannerApi"; // Adjust the path to your API function
import { uploadFileToFirebase } from "../../../../../utils/uploadFileToFirebase";

const BannerForm = () => {
  const [formData, setFormData] = useState({
    banner_name: "",
    banner_image: null, // Will hold the file object
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null); // Clear any existing errors
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setFormData((prev) => ({
        ...prev,
        banner_image: file,
      }));
      setError(null);
    } else {
      setFormData((prev) => ({
        ...prev,
        banner_image: null,
      }));
      setError("Please select a valid file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage("");

    try {
      if (!formData.banner_name || !formData.banner_image) {
        setError("Both banner name and image are required.");
        setIsSubmitting(false);
        return;
      }

      // Prepare FormData for file upload
    //   const formPayload = new FormData();
    //   formPayload.append("banner_name", formData.banner_name);
    //   formPayload.append("banner_image", formData.banner_image);
    const downloadUrl =  await uploadFileToFirebase(formData.banner_image, "bannerImages");
    const submissionData = { banner_name: formData.banner_name, banner_image: downloadUrl };

      // Call the API function to create the banner
      const response = await createBanner(submissionData);

      setSuccessMessage("Banner created successfully!");
      console.log("Banner response:", response); // Debugging log to verify response

      // Reset the form
      setFormData({
        banner_name: "",
        banner_image: null,
      });

      // Clear the file input value
      e.target.reset();
    } catch (error) {
      setError(error.response?.data?.error || "Failed to create banner. Please try again later.");
      console.error("Error creating banner:", error.response?.data || error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <h2>Create Banner</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div >
          <label htmlFor="banner_name">Banner Name:</label>
          <input
            type="text"
            id="banner_name"
            name="banner_name"
            value={formData.banner_name}
            onChange={handleInputChange}
            placeholder="Enter banner name"
            required
          />
        </div>

        <div>
          <label htmlFor="banner_image">Banner Image:</label>
          <input
            type="file"
            id="banner_image"
            name="banner_image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </FormContainer>
  );
};

export default BannerForm;
