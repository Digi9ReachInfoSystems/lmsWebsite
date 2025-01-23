import React, { useState } from "react";
import { Input, Select, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createCircularNotificationApi } from "../../../../api/circularNotificationApi";
import { CircularFormContainer, FormGroup } from "./CreateCircular.styles";

const { TextArea } = Input;

const CreateCircular = ({ closeModal, addCircularToList }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validDate, setValidDate] = useState("");
  const [metaImage, setMetaImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [role, setRole] = useState("all");

  const handleImageChange = (info) => {
    if (info.fileList.length > 0) {
      setMetaImage(info.fileList[0].originFileObj);
      setImagePreview(URL.createObjectURL(info.fileList[0].originFileObj));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !description || !validDate || !metaImage) {
      toast.error("All fields are required, including an image.");
      return;
    }

    const notificationData = {
      circularName: title,
      validDate,
      content: description,
      imageFile: metaImage,
      role,
    };

    try {
      const newCircular = await createCircularNotificationApi(notificationData);
      toast.success("Circular created successfully!");
      addCircularToList(newCircular); // Add to table immediately
      closeModal();
    } catch (error) {
      toast.error("Failed to create circular. Please try again.");
    }
  };

  return (
    <CircularFormContainer>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label className="label">Title:</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter circular title"
          />
        </FormGroup>
        <FormGroup>
          <label className="label">Description:</label>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter circular description"
            rows={4}
          />
        </FormGroup>
        <FormGroup>
          <label className="label">Valid Till:</label>
          <Input
            type="date"
            value={validDate}
            onChange={(e) => setValidDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </FormGroup>
        <FormGroup>
          <label className="label">Role:</label>
          <Select
            value={role}
            onChange={(value) => setRole(value)}
            style={{ width: "100%" }}
          >
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="student">Student</Select.Option>
            <Select.Option value="teacher">Teacher</Select.Option>
          </Select>
        </FormGroup>
        <FormGroup>
          <label className="label">
            {imagePreview ? (
              <img src={imagePreview} alt="Circular Preview" className="image-preview" />
            ) : (
              "Upload Image:"
            )}
          </label>
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleImageChange}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </FormGroup>
        <Button
          style={{
            backgroundColor: "#EE1B7A",
            color: "white",
            marginTop: "20px",
          }}
          type="primary"
          htmlType="submit"
          block
        >
          Submit
        </Button>
      </form>
    </CircularFormContainer>
  );
};

export default CreateCircular;
