import React, { useState } from "react";
import "./CreateCircular.css";
import { FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";
import { createCircularNotificationApi } from "../../../../api/circularNotificationApi";

const CreateCircular = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validDate, setValidDate] = useState("");
  const [metaImage, setMetaImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(""); // For image preview
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMetaImage(file); // Store the file object
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input
    if (!title || !description || !validDate || !metaImage) {
      setError("All fields are required, including an image.");
      return;
    }

    const notificationData = {
      circularName: title,
      validDate,
      content: description,
      imageFile: metaImage,
    };

    try {
      const response = await createCircularNotificationApi(notificationData);
      console.log("Circular created successfully:", response);
      setSuccessMessage("Circular notification created successfully!");
      setError(""); // Clear previous errors
      setTitle(""); // Clear form inputs
      setDescription("");
      setValidDate("");
      setMetaImage(null);
      setImagePreview(""); // Clear image preview
    } catch (error) {
      console.error("Error creating circular:", error);
      setError("Failed to create circular. Please try again.");
    }
  };

  return (
    <div className="CreateCircular-formContainer">
      <div className="CreateCircular-batchesNav">
        <h2 className="CreateCircular-batchTitle">Create Circular</h2>
        <Link to="/admin/circular" className="CreateCircular-batchBtn">
          <FiFileText className="CreateCircular-batchIcon" />
          <span>Back to Circulars</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="CreateCircular-circularForm">
        {error && <p className="error_message">{error}</p>}
        {successMessage && <p className="success_message">{successMessage}</p>}

        <div className="CreateCircular-formGroup">
          <label className="CreateCircular-Title">Title <span>:</span></label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="CreateCircular-formInput"
            placeholder="Enter circular title"
          />
        </div>

        <div className="CreateCircular-formGroup">
          <label className="CreateCircular-Description">
            Description<span>:</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="CreateCircular-formInput"
            placeholder="Enter circular description"
          />
        </div>

        <div className="CreateCircular-formGroup">
          <label className="CreateCircular-Date">
            Valid Date<span>:</span>
          </label>
          <input
            type="date"
            value={validDate}
            onChange={(e) => setValidDate(e.target.value)}
            className="CreateCircular-formInput"
          />
        </div>

        <div className="CreateCircular-formGroup">
          <label htmlFor="CreateCircular-ProfileImage" className="CreateCircular-ProfileImage">
            {imagePreview ? (
              <img
              width={"10%"}
height={"10%"}
                src={imagePreview}
                alt="Circular Preview"
                className="CreateCircular-profileImagePreview"
              />
            ) : (
              "Upload Circular Image :"
            )}
          </label>
          <input
            type="file"
            accept="image/*"
            id="CreateCircular-ProfileImage"
            onChange={handleImageChange}
            className="CreateCircular-formInput"
          />
        </div>

        <button type="submit" className="CreateCircular-formSubmitButton">
          Send
        </button>
      </form>
    </div>
  );
};

export default CreateCircular;
