import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import ContactImage from "../../assets/ContactUsImage.png";
import {
  ContactUsWarp,
  ContactContainer,
  ContactForm,
  ContactImageContainer,
  Image,
  ContactInfo,
  ContactItem,
} from "./ContactUs.Styles";
import HeaderSection from "../NavBar/navbar";
import Footer from "../Footer/Footer";
import { createQuery } from "../../../api/customerQueryApi"; // Ensure the API function path is correct
import { FiMessageSquare, FiPhoneCall } from "react-icons/fi";
import { FaRegEnvelope } from "react-icons/fa6";
import { LiaFacebookMessenger } from "react-icons/lia";
import { IoInformationCircleOutline } from "react-icons/io5";
import {
  customerQuery,
  customerQueryAdmin,
} from "../../../api/mailNotificationApi";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactItems = [
    {
      id: "info",
      label: "Company Information",
      detail: "Roy Career Solutions Private Limited",
      Link: "https://roycareersolutions.com/",
      // detail: "XYZ",
      icon: IoInformationCircleOutline,
    },
    {
      id: "Text us ON Whatsapp",
      label: "Text us",
      detail: "(+91) 9916299333",
      icon: FiMessageSquare,
    },
    {
      id: "call",
      label: "Call us",
      detail: "+91 7667840906",
      icon: FiPhoneCall,
    },
    {
      id: "message",
      label: "Message us",
      detail: "Facebook Message",
      Link: "https://www.facebook.com/people/The-Topper-Academy/61567845897039/",
      icon: LiaFacebookMessenger,
    },
    {
      id: "email",
      label: "Email us",
      detail: "info@thetopperacademy.com",
      icon: FaRegEnvelope,
    },
  ];

  const [form] = Form.useForm(); // Ant Design Form instance

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true); // Disable the button immediately after click
  
      const submissionData = {
        title: values.title,
        contactEmail: values.email,
        contactNumber: values.number,
        message: values.message,
      };
  
      // Call the API to create the query
      const response = await createQuery(submissionData);
      await customerQueryAdmin(values.title, values.email);
      await customerQuery(values.title, values.email);
  
      if (response) {
        // Show the alert message after 1 second
        setTimeout(() => {
          alert("Query submitted successfully!");
          form.resetFields(); // Reset form fields
          setIsSubmitting(false); // Re-enable the button after alert
        }, 1000); // Alert after 1 second
      }
    } catch (error) {
      alert("Failed to submit query. Please try again.");
      setIsSubmitting(false); // Re-enable the button on error
    } finally {
      form.resetFields(); // Reset form fields regardless of success or error
    }
  };
  

  return (
    <>
      <HeaderSection />
      <ContactUsWarp>
        <ContactContainer>
          <ContactForm>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              {/* Title Input */}
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter the title" }]}
              >
                <Input placeholder="Enter the Title" />
              </Form.Item>

              {/* Email Input */}
              <Form.Item
                name="email"
                label="Contact Email"
                rules={[
                  { required: true, message: "Please enter the email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter the Email" />
              </Form.Item>

              {/* Contact Number Input */}
              <Form.Item
                name="number"
                label="Contact Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter the contact number",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Contact number must be 10 digits",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Enter the Number"
                  maxLength={10} // Limit the input to 10 characters
                  onKeyPress={(event) => {
                    if (!/^[0-9]$/.test(event.key)) {
                      event.preventDefault(); // Prevent invalid input
                    }
                  }}
                />
              </Form.Item>

              {/* Message Input */}
              <Form.Item
                name="message"
                label="Message"
                rules={[
                  { required: true, message: "Please enter the message" },
                ]}
              >
                <TextArea placeholder="Enter the Message" />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="ContactButton"
                  disabled={isSubmitting} // Disable button while submitting
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </Form.Item>
            </Form>
          </ContactForm>
        </ContactContainer>

        {/* Contact Image */}
        <ContactImageContainer>
          <Image src={ContactImage} alt="Contact Us" />
        </ContactImageContainer>
      </ContactUsWarp>

      <ContactInfo>
        {contactItems.map(({ id, label, detail, icon: Icon, Link }) => (
          <ContactItem key={id}>
            <a href={Link} target="_blank" rel="noopener noreferrer">
              <Icon className="contact-icon" title={label} />
            </a>
            <p>
              {label}
              <br />
              <strong>{detail}</strong>
            </p>
          </ContactItem>
        ))}
      </ContactInfo>

      <Footer />
    </>
  );
};

export default ContactUs;
