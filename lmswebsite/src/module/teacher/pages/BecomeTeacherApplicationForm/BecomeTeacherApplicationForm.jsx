import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./BecomeTeacherApplicationForm.css";
import Header from "../../components/Header/Header";
import LMS from "../../components/LMS/LMS";
import BecomeTeacherLogo from "../../assets/BecomeTeacherLogo.png";
import { submitTeacherApplication } from "../../../../api/teachersApplicationApi";
import TeachersSection from "../../components/TeacherSection/TeachersSection";

const BecomeTeacherApplicationForm = () => {
  const [formData, setFormData] = useState({
    state: "",
    city: "",
    pincode: "",
    phone_number: "",
    current_position: "",
    language: "",
    experience: "",
    resume: null,
    profileImage: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = new FormData();
  // console.log("Form Data:", formData);
      // Append text fields
      submissionData.append("state", formData.state);
      submissionData.append("city", formData.city);
      submissionData.append("pincode", formData.pincode);
      submissionData.append("phone_number", formData.phone_number); // Matching backend name
      submissionData.append("current_position", formData.current_position);
      submissionData.append("language", formData.language);
      submissionData.append("experience", formData.experience);

      // Append files
      submissionData.append("resume", formData.resume);
      submissionData.append("profileImage", formData.profileImage);
      // console.log("Submission Data:", submissionData);
      const response = await submitTeacherApplication(formData);
      alert("Application submitted successfully!");
      console.log("Application Response:", response);
    } catch (error) {
      alert("Failed to submit the application. Please try again.");
      console.error("Application Submission Error:", error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="applicationContainer">
        <div className="applicationImage">
          <img src={BecomeTeacherLogo} alt="teacherFormImage" className="teacherformImage" />
        </div>
        <div className="applicationDetails">
          <h2 className="applicationFormTitle">Love Teaching Students? Join Us</h2>
          <p className="applicationFormSubtitle">
            Become a Teacher and train students all around the world.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="applicationRowOne">
              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="applicationRowTwo">
              <input
                type="tel"
                name="pincode"
                placeholder="Enter PinCode"
                value={formData.pincode}
                onChange={handleInputChange}
                required
              />
              <select
                name="current_position"
                onChange={handleInputChange}
                required
              >
                <option value="">Select Position</option>
                <option value="Teacher">Teacher</option>
                <option value="Assistant">Assistant</option>
                <option value="Principal">Principal</option>
              </select>

              <select
                name="experience"
                onChange={handleInputChange}
                required
              >
                <option value="">Select Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4+ Years">4+ Years</option>
              </select>
            </div>

            <div className="applicationRowThree">
              <select
                name="language"
                onChange={handleInputChange}
                required
              >
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>

              <div className="uploadWrapper">
                <input
                  type="file"
                  name="resume"
                  onChange={handleFileChange}
                  required
                />
                <label className="uploadLabel">
                  <span>Upload Resume</span>
                  <FaCloudUploadAlt className="uploadIcon" />
                </label>
              </div>

              <div className="uploadWrapper">
                <input
                  type="file"
                  name="profileImage"
                  onChange={handleFileChange}
                  required
                />
                <label className="uploadLabel">
                  <span>Upload Profile Image</span>
                  <FaCloudUploadAlt className="uploadIcon" />
                </label>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <LMS/>
      <TeachersSection/>
    </>
   
  );
};

export default BecomeTeacherApplicationForm;
