// src/components/TeacherAssignmentUpload.jsx

import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Table,
  Modal,
  Form,
  Select,
  DatePicker,
  message,
  Spin,
  Upload,
} from "antd";
import { InboxOutlined, UploadOutlined, SearchOutlined } from "@ant-design/icons";
import { getBatchesByTeacherId } from "../../../../../api/batchApi"; // Adjust the path as needed
import { getTeacherByAuthId } from "../../../../../api/teacherApi"; // Adjust the path as needed
import { createAssignment, getAllAssignments } from "../../../../../api/assignmentApi"; // Adjust the path as needed
import api from "../../../../../config/axiosConfig"; // Axios instance
import { TeacherCircularWrap } from "./TeacherAssignmentUpload.styles"; // Ensure this styled component exists
import Lottie from "lottie-react"; // For animations
import Animation from "../../../../teacher/assets/Animation.json"; // Adjust the path as needed
import moment from "moment"; // For date handling

const { Option } = Select;
const { Dragger } = Upload;

const TeacherAssignmentUpload = () => {
  // State variables
  const [teacherData, setTeacherData] = useState(null);
  const [loadingTeacher, setLoadingTeacher] = useState(true);
  const [batches, setBatches] = useState([]);
  const [loadingBatches, setLoadingBatches] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [loadingAssignments, setLoadingAssignments] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [fileList, setFileList] = useState([]); // Manage uploaded files
  const [uploading, setUploading] = useState(false); // Manage upload state
  const [contentUrl, setContentUrl] = useState(""); // Store the uploaded content URL
  const [submitting, setSubmitting] = useState(false); // Manage form submission state

  // Form instance
  const [form] = Form.useForm();

  /**
   * Fetch Teacher Data
   */
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const sessionData = JSON.parse(localStorage.getItem("sessionData"));
        if (!sessionData || !sessionData.userId) {
          throw new Error("User is not authenticated.");
        }
        const teacher = await getTeacherByAuthId(sessionData.userId);
        setTeacherData(teacher);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
        message.error("Failed to fetch teacher data. Please try again.");
      } finally {
        setLoadingTeacher(false);
      }
    };

    fetchTeacherData();
  }, []);

  /**
   * Fetch Batches after Teacher Data is available
   */
  useEffect(() => {
    const fetchBatches = async () => {
      if (!teacherData || !teacherData._id) return;

      try {
        setLoadingBatches(true);
        console.log("Teacher ID:", teacherData._id);
        const batchesData = await getBatchesByTeacherId(teacherData._id);
        console.log("Batches fetched successfully:", batchesData);
        setBatches(batchesData);
        console.log("Batches:", batchesData);
        // if (Array.isArray(batchesData)) {
        //   setBatches(batchesData);
        // } else {
        //   // Handle unexpected response structure
        //   console.error("Unexpected batches data format:", batchesData);
        //   message.error("Failed to fetch batches. Please try again.");
        // }
      } catch (error) {
        console.error("Error fetching batches:", error);
        message.error("Failed to fetch batches. Please try again.");
      } finally {
        setLoadingBatches(false);
      }
    };

    fetchBatches();
  }, [teacherData]);

  /**
   * Fetch All Assignments
   */
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoadingAssignments(true);
        const response = await getAllAssignments();
        if (response.assignments && Array.isArray(response.assignments)) {
          setAssignments(response.assignments);
        } else {
          console.error("Unexpected assignments data format:", response);
          message.error("Failed to fetch assignments. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching assignments:", error);
        message.error("Failed to fetch assignments. Please try again.");
      } finally {
        setLoadingAssignments(false);
      }
    };

    fetchAssignments();
  }, []);

  /**
   * Handle "Upload" Button Click
   */
  const handleUploadClick = () => {
    setIsModalVisible(true);
  };

  /**
   * Handle Modal Cancel
   */
  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setFileList([]);
    setContentUrl("");
  };

  /**
   * Handle File Upload
   */
  const handleFileUpload = async (file) => {
    // Validate file type and size
    const isAllowedType =
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type.startsWith("image/");
    if (!isAllowedType) {
      message.error(
        "You can only upload PDF, DOC, DOCX, PPT, PPTX, JPG, JPEG, or PNG files!"
      );
      return Upload.LIST_IGNORE;
    }

    const isLt10M = file.size / 1024 / 1024 < 10; // Limit to 10MB
    if (!isLt10M) {
      message.error("File must be smaller than 10MB!");
      return Upload.LIST_IGNORE;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload Response:", response.data); // Debugging

      // Assuming the response contains the URL in response.data.url
      const uploadedUrl = response.data.url;
      setContentUrl(uploadedUrl);
      form.setFieldsValue({ content_url: uploadedUrl });

      message.success(`${file.name} file uploaded successfully.`);
      setFileList([
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: uploadedUrl,
        },
      ]);
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }

    // Prevent automatic upload by returning false
    return false;
  };

  /**
   * Handle File Removal
   */
  const handleRemove = () => {
    form.setFieldsValue({ content_url: "" });
    setFileList([]);
    setContentUrl("");
  };

  /**
   * Handle Form Submission
   */
  const handleFormSubmit = async (values) => {
    setSubmitting(true);
    try {
      const { batch_id, expiry_date } = values;

      if (!contentUrl) {
        message.error("Please upload a content file.");
        setSubmitting(false);
        return;
      }

      const payload = {
        batch_id,
        teacher_id: teacherData._id,
        content_url: contentUrl,
        expiry_date: expiry_date.toISOString(),
      };

      const newAssignment = await createAssignment(payload);

      console.log("Created Assignment:", newAssignment); // Debugging

      message.success("Assignment created successfully!");
      setIsModalVisible(false);
      form.resetFields();
      setFileList([]);
      setContentUrl("");
      // Refresh assignments list
      const assignmentsData = await getAllAssignments();
      if (assignmentsData.assignments && Array.isArray(assignmentsData.assignments)) {
        setAssignments(assignmentsData.assignments);
      } else {
        console.error("Unexpected assignments data format:", assignmentsData);
        message.error("Failed to refresh assignments. Please try again.");
      }
    } catch (error) {
      console.error("Error creating assignment:", error);
      message.error(
        error.response?.data?.error ||
          "An error occurred while creating the assignment."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Handle Search Input Change
   */
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  /**
   * Filter Assignments Based on Search Input
   */
  const filteredAssignments = assignments.filter((assignment) => {
    const searchLower = searchInput.toLowerCase();
    const batchName = assignment.batch_id?.batch_name?.toLowerCase() || "";
    const contentUrl = assignment.content_url?.toLowerCase() || "";
    const teacherName =
      assignment.teacher_id?.user_id?.name?.toLowerCase() || "";
    return (
      batchName.includes(searchLower) ||
      contentUrl.includes(searchLower) ||
      teacherName.includes(searchLower)
    );
  });

  /**
   * Define Table Columns
   */
  const tableColumns = [
    {
      title: "Batch",
      dataIndex: ["batch_id", "batch_name"],
      key: "batch",
      sorter: (a, b) =>
        a.batch_id.batch_name.localeCompare(b.batch_id.batch_name),
    },
    {
      title: "Content",
      dataIndex: "content_url",
      key: "content_url",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          View Content
        </a>
      ),
      sorter: (a, b) => a.content_url.localeCompare(b.content_url),
    },
    {
      title: "Expiry Date",
      dataIndex: "expiry_date",
      key: "expiry_date",
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.expiry_date) - new Date(b.expiry_date),
    },
    {
      title: "Teacher",
      dataIndex: ["teacher_id", "user_id", "name"],
      key: "teacher",
      sorter: (a, b) =>
        a.teacher_id.user_id.name.localeCompare(b.teacher_id.user_id.name),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          danger
          onClick={() => handleDeleteAssignment(record._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  /**
   * Handle Assignment Deletion (Optional)
   */
  const handleDeleteAssignment = async (assignmentId) => {
    try {
      await api.delete(`/assignments/${assignmentId}`);
      message.success("Assignment deleted successfully!");
      // Refresh assignments list
      const assignmentsData = await getAllAssignments();
      if (assignmentsData.assignments && Array.isArray(assignmentsData.assignments)) {
        setAssignments(assignmentsData.assignments);
      } else {
        console.error("Unexpected assignments data format:", assignmentsData);
        message.error("Failed to refresh assignments. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting assignment:", error);
      message.error(
        error.response?.data?.error ||
          "An error occurred while deleting the assignment."
      );
    }
  };

  /**
   * Render Loading Animation
   */
  const renderLoading = () => (
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
          transform: "scale(0.5)",
          transformOrigin: "center center",
        }}
      >
        <Lottie animationData={Animation} loop={true} />
      </div>
    </div>
  );

  /**
   * Main Render
   */
  if (loadingTeacher) {
    return renderLoading();
  }

  return (
    <TeacherCircularWrap>
      {/* Header */}
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Assignment Details</h2>
        <div
          className="header-actions"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Input
            placeholder="Search by Batch, URL, or Teacher Name"
            value={searchInput}
            onChange={handleSearch}
            allowClear
            prefix={<SearchOutlined />}
            style={{ marginRight: "20px", width: "300px" }}
          />
          <Button
            type="primary"
            onClick={handleUploadClick}
            icon={<UploadOutlined />}
            style={{
              backgroundColor: "#EE1B7A",
              borderColor: "pink",
              color: "#fff",
            }}
            disabled={loadingBatches}
          >
            Upload
          </Button>
        </div>
      </div>

      {/* Assignments Table */}
      <Table
        columns={tableColumns}
        dataSource={filteredAssignments}
        pagination={{ pageSize: 5 }}
        bordered
        style={{ marginTop: "20px" }}
        loading={loadingAssignments}
        rowKey={(record) => record._id} // Ensure each assignment has a unique _id
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>
              <strong>Content URL:</strong>{" "}
              <a href={record.content_url} target="_blank" rel="noopener noreferrer">
                {record.content_url}
              </a>
            </p>
          ),
          rowExpandable: (record) => record.content_url !== "",
        }}
      />

      {/* Upload Assignment Modal */}
      <Modal
        title="Create New Assignment"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        destroyOnClose
        width={600}
      >
        {loadingBatches ? (
          <Spin tip="Loading batches..." />
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={{
              content_url: "",
            }}
          >
            <Form.Item
              name="batch_id"
              label="Select Batch"
              rules={[{ required: true, message: "Please select a batch." }]}
            >
              <Select placeholder="Select a batch">
                {batches.length > 0 ? (
                  batches.map((batch) => (
                    <Option key={batch._id} value={batch._id}>
                      {batch.batch_name}
                    </Option>
                  ))
                ) : (
                  <Option disabled>No batches available</Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              name="content_url"
              label="Content File"
              rules={[{ required: true, message: "Please upload a content file." }]}
            >
              <Dragger
                name="file"
                multiple={false}
                beforeUpload={handleFileUpload}
                fileList={fileList}
                onRemove={handleRemove}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                showUploadList={{
                  showPreviewIcon: false,
                  showRemoveIcon: true,
                  showDownloadIcon: false,
                }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single upload. Only PDF, DOC, DOCX, PPT, PPTX, JPG, JPEG, PNG files are allowed.
                </p>
              </Dragger>
            </Form.Item>

            <Form.Item
              name="expiry_date"
              label="Expiry Date"
              rules={[{ required: true, message: "Please select an expiry date." }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={(current) =>
                  current && current < moment().startOf("day")
                }
                showTime
                format="YYYY-MM-DD HH:mm"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={submitting || uploading}
                style={{
                  backgroundColor: "#EE1B7A",
                  borderColor: "pink",
                  color: "#fff",
                }}
                block
              >
                Create Assignment
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* Loading Indicator for Uploading or Submitting */}
      {(uploading || submitting) && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
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
              transform: "scale(0.5)",
              transformOrigin: "center center",
            }}
          >
            <Lottie animationData={Animation} loop={true} />
          </div>
        </div>
      )}
    </TeacherCircularWrap>
  );
};

export default TeacherAssignmentUpload;
