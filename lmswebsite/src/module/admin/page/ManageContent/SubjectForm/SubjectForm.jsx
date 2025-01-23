import React, { useState, useEffect } from "react";
import { Form, Input, Select, Radio, Button, Spin, Alert, message, Upload } from "antd";
import { createSubject } from "../../../../../api/subjectApi";
import { getBoards } from "../../../../../api/boadApi";
import { getClassesByBoardId } from "../../../../../api/classApi";
import { FormContainer } from "./SubjectForm.style";
import Animation from "../../../../admin/assets/Animation.json";
import Lottie from "lottie-react";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFileToFirebase } from "../../../../../utils/uploadFileToFirebase";

const { Option } = Select;

const SubjectForm = ({onClose, }) => {
  const [form] = Form.useForm();
  const [boards, setBoards] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loadingBoards, setLoadingBoards] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [boardsError, setBoardsError] = useState(null);
  const [classesError, setClassesError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null); // To hold uploaded image file

  // Fetch all boards on component mount
  useEffect(() => {
    const fetchBoards = async () => {
      setLoading(true);
      setLoadingBoards(true);
      setBoardsError(null);
      try {
        const fetchedBoards = await getBoards();
        setBoards(fetchedBoards);
      } catch (error) {
        setBoardsError(error.response?.data?.error || "Failed to fetch boards.");
      } finally {
        setLoadingBoards(false);
      }
    };
    fetchBoards();
    setLoading(false);
    // window.location.reload();
  }, []);

  // Fetch classes whenever the board_id changes
  const handleBoardChange = async (boardId) => {
    form.setFieldsValue({ class_id: undefined });
    setClasses([]);
    if (!boardId) return;

    setLoadingClasses(true);
    setClassesError(null);
    try {
      const fetchedClasses = await getClassesByBoardId(boardId);
      setClasses(fetchedClasses);
    } catch (error) {
      setClassesError(error.response?.data?.error || "Failed to fetch classes.");
    } finally {
      setLoadingClasses(false);
    }
  };
  // Handle image upload
  const handleImageChange = ({ file }) => {
    setImageFile(file); // Save the file in state
  };

  // const handleSubmit = async (values) => {
  //   setIsSubmitting(true);
  //   const downloadUrl = await uploadFileToFirebase(imageFile, "subjectImage");
  //   //console.log('Form Values:', values); // Log form values
  //   const submissionData = { ...values, icon: downloadUrl };
  //   try {
  //     await createSubject(submissionData);
  //     message.success("Subject created successfully!");
  //     form.resetFields();
  //     setClasses([]);
  //     onClose();
  //   } catch (error) {
  //     const errorMsg =
  //       error.response?.data?.error || error.message || "Failed to create subject.";
  //     message.error(errorMsg);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
  
    try {
      // Upload the image and include the download URL in the form data
      const downloadUrl = await uploadFileToFirebase(imageFile, "subjectImage");
      const submissionData = { ...values, icon: downloadUrl };
  
      // Call the `onSubmit` prop to handle the creation process
      await onSubmit(submissionData);
  
      message.success("Subject created successfully!");
      form.resetFields();
      setClasses([]);
      onClose(); // Close the modal after submission
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || error.message || "Failed to create subject.";
      message.error(errorMsg);
    } finally {
      setIsSubmitting(false);
      window.location.reload();
    }
  };
  
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "300px",
            height: "300px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // Scale down the animation using transform
            transform: "scale(0.5)",
            transformOrigin: "center center",
          }}
        >
          <Lottie
            animationData={Animation}
            loop={true}
          />
        </div>
      </div>
    );
  }

  return (
    <FormContainer>
      <h2>Create Subject</h2>

      {/* Display error messages or loading spinners */}
      {(loadingBoards || loadingClasses) && <Spin tip="Loading..." />}
      {(boardsError || classesError) && (
        <Alert
          message={boardsError || classesError}
          type="error"
          showIcon
          style={{ marginBottom: "1em" }}
        />
      )}

      {/* Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          language: "english",
          is_grammar_subject: "false",
          approval_status: "pending",
        }}
      >
        {/* Subject Name */}
        <Form.Item
          label="Subject Name"
          name="subject_name"
          rules={[{ required: true, message: "Please enter the subject name" }]}
        >
          <Input placeholder="Enter Subject Name" />
        </Form.Item>

        {/* Board ID */}
        <Form.Item
          label="Board"
          name="board_id"
          rules={[{ required: true, message: "Please select a board" }]}
        >
          <Select
            placeholder="Select Board"
            onChange={handleBoardChange}
            loading={loadingBoards}
          >
            {boards.map((board) => (
              <Option key={board._id} value={board._id}>
                {board.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Class ID */}
        <Form.Item
          label="Class"
          name="class_id"
          rules={[{ required: true, message: "Please select a class" }]}
        >
          <Select
            placeholder="Select Class"
            disabled={!form.getFieldValue("board_id") || loadingClasses}
            loading={loadingClasses}
          >
            {classes.map((cls) => (
              <Option key={cls._id} value={cls._id}>
                Class: {cls.classLevel}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Language */}
        <Form.Item
          label="Language"
          name="language"
          rules={[{ required: true, message: "Please select a language" }]}
        >
          <Select>
            <Option value="english">English</Option>
            <Option value="hindi">Hindi</Option>
          </Select>
        </Form.Item>

        {/* Is Grammar Subject */}
        <Form.Item
          label="Is Grammar Subject?"
          name="is_grammar_subject"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value="true">True</Radio>
            <Radio value="false">False</Radio>
          </Radio.Group>
        </Form.Item>
        {/* Image Upload */}
        <Form.Item
          label="Subject Image"
          name="imageLink"
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <Upload
            beforeUpload={() => false} // Prevent auto-upload
            maxCount={1}
            onChange={handleImageChange}
            accept="image/*"
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default SubjectForm;