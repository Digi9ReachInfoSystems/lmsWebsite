// src/components/TeacherAssignmentUpload.jsx

import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  Form,
  Select,
  DatePicker,
  message,
  Spin,
  Upload,
  List,
  Card,
  Typography,
  Popconfirm,
} from "antd";
import { UploadOutlined, SearchOutlined } from "@ant-design/icons";
import { getBatchesByTeacherId } from "../../../../../api/batchApi"; // Adjust the path as needed
import { getTeacherByAuthId } from "../../../../../api/teacherApi"; // Adjust the path as needed

// UPDATED: Removed getAllAssignments import, added getAssignmentsByTeacherId
import {
  createAssignment,
  deleteAssignment,
  getAssignmentsByTeacherId, // <-- import this
} from "../../../../../api/assignmentApi"; // Adjust the path as needed

import { uploadFileToFirebase } from "../../../../../utils/uploadFileToFirebase"; // Adjust the path as needed
import { TeacherCircularWrap } from "./TeacherAssignmentUpload.styles"; // Ensure this styled component exists
import Lottie from "lottie-react"; // For animations
import Animation from "../../../../teacher/assets/Animation.json"; // Adjust the path as needed
import moment from "moment"; // For date handling

// Import React Router's useNavigate
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const { Option } = Select;
const { Text, Link, Title } = Typography;

const TeacherAssignmentUpload = () => {
  // Initialize navigation
  const navigate = useNavigate();

  // State variables
  const [teacherData, setTeacherData] = useState(null);
  const [loadingTeacher, setLoadingTeacher] = useState(true);
  const [batches, setBatches] = useState([]);
  const [loadingBatches, setLoadingBatches] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [loadingAssignments, setLoadingAssignments] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [submitting, setSubmitting] = useState(false); // Manage form submission state

  // State variables for file upload
  const [fileList, setFileList] = useState([]); // Manage uploaded file list
  const [contentUrl, setContentUrl] = useState(""); // Store the uploaded file's URL
  const [uploadingFile, setUploadingFile] = useState(false); // Manage file uploading state

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
        //console.log("Fetched teacher data:", teacher);
        setTeacherData(teacher);
      } catch (error) {
        //console.error("Error fetching teacher data:", error);
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
      //console.log("Teacher Data:", teacherData);

      let teacherId;
      if (teacherData && teacherData._id) {
        teacherId = teacherData._id;
      } else if (
        teacherData &&
        teacherData.teacher &&
        teacherData.teacher._id
      ) {
        teacherId = teacherData.teacher._id;
      } else {
        //console.log("Teacher ID not found in teacherData");
        message.error("Teacher ID not found.");
        return;
      }

      try {
        setLoadingBatches(true);
        //console.log("Teacher ID:", teacherId);
        const batchesData = await getBatchesByTeacherId(teacherId);
        //console.log("Batches fetched successfully:", batchesData);
        setBatches(batchesData);
      } catch (error) {
        //console.error("Error fetching batches:", error);
        message.error("Failed to fetch batches. Please try again.");
      } finally {
        setLoadingBatches(false);
      }
    };

    if (teacherData) {
      fetchBatches();
    }
  }, [teacherData]);

  /**
   * Helper to extract Teacher ID
   */
  const getTeacherId = () => {
    if (teacherData && teacherData._id) {
      return teacherData._id;
    } else if (
      teacherData &&
      teacherData.teacher &&
      teacherData.teacher._id
    ) {
      return teacherData.teacher._id;
    } else {
      return null;
    }
  };

  /**
   * Fetch Assignments by Teacher ID
   */
  useEffect(() => {
    const fetchAssignmentsByTeacherId = async () => {
      const teacherId = getTeacherId();
      if (!teacherId) {
        //console.error("Teacher ID not found. Unable to fetch assignments.");
        return;
      }

      try {
        setLoadingAssignments(true);
        const response = await getAssignmentsByTeacherId(teacherId);
        //console.log("Fetched assignments:", response);

        // Adjust this based on how your API returns data.
        // For instance, if response already is an array, you may not need the .assignments check.
        if (response.assignments && Array.isArray(response.assignments)) {
          setAssignments(response.assignments);
        } else {
          //console.error("Unexpected assignments data format:", response);
          message.error("Failed to fetch assignments. Please try again.");
        }
      } catch (error) {
        //console.error("Error fetching assignments:", error);
        message.error("Failed to fetch assignments. Please try again.");
      } finally {
        setLoadingAssignments(false);
      }
    };

    if (teacherData) {
      fetchAssignmentsByTeacherId();
    }
  }, [teacherData]);

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
    setContentUrl("");
    setFileList([]);
  };

  /**
   * Handle Form Submission
   */
  const handleFormSubmit = async (values) => {
    if (!contentUrl) {
      message.error("Please upload a content file before submitting.");
      return;
    }

    const teacherId = getTeacherId();
    if (!teacherId) {
      message.error("Teacher ID is not available. Please try again.");
      return;
    }

    setSubmitting(true);
    try {
      const { batch_id, expiry_date } = values;

      const payload = {
        batch_id,
        teacher_id: teacherId,
        content_url: contentUrl,
        expiry_date: expiry_date.toISOString(),
      };

      // Debugging: Log the payload to ensure all fields are present
      //console.log("Submitting Assignment Payload:", payload);

      const newAssignment = await createAssignment(payload);

      //console.log("Created Assignment:", newAssignment); // Debugging

      message.success("Assignment created successfully!");
      setIsModalVisible(false);
      form.resetFields();
      setContentUrl("");
      setFileList([]);

      // Refresh assignments list (by teacher)
      const assignmentsData = await getAssignmentsByTeacherId(teacherId);
      if (
        assignmentsData.assignments &&
        Array.isArray(assignmentsData.assignments)
      ) {
        setAssignments(assignmentsData.assignments);
      } else {
        //console.error("Unexpected assignments data format:", assignmentsData);
        message.error("Failed to refresh assignments. Please try again.");
      }
    } catch (error) {
      //console.error("Error creating assignment:", error);
      // Enhanced error message handling
      if (error.response && error.response.data && error.response.data.error) {
        message.error(`Error: ${error.response.data.error}`);
      } else {
        message.error(
          "An error occurred while creating the assignment. Please try again."
        );
      }
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
   * Handle Assignment Deletion with Confirmation
   */
  const confirmDeleteAssignment = async (assignmentId) => {
    const teacherId = getTeacherId();
    if (!teacherId) {
      message.error("Teacher ID is not available. Please try again.");
      return;
    }

    try {
      await deleteAssignment(assignmentId);
      message.success("Assignment deleted successfully!");

      // Refresh assignments list (by teacher)
      const assignmentsData = await getAssignmentsByTeacherId(teacherId);
      if (
        assignmentsData.assignments &&
        Array.isArray(assignmentsData.assignments)
      ) {
        setAssignments(assignmentsData.assignments);
      } else {
        //console.error("Unexpected assignments data format:", assignmentsData);
        message.error("Failed to refresh assignments. Please try again.");
      }
    } catch (error) {
      //console.error("Error deleting assignment:", error);
      if (error.response && error.response.data && error.response.data.error) {
        message.error(`Error: ${error.response.data.error}`);
      } else {
        message.error(
          "An error occurred while deleting the assignment. Please try again."
        );
      }
    }
  };

  /**
   * Handle Viewing Responses
   */
  const handleViewResponses = (assignmentId) => {
    navigate(
      `/teacher/dashboard/quizz/assignedBatch/uploadContent/${assignmentId}/responses`
    );
  };

  /**
   * Handle File Upload Change
   */
  const handleFileChange = async ({ file, fileList }) => {
    // If the file is removed
    if (file.status === "removed") {
      setFileList([]);
      setContentUrl("");
      return;
    }

    // Only handle the first file in the list
    const currentFile = fileList[0];

    if (currentFile && currentFile.originFileObj) {
      try {
        setUploadingFile(true);
        const uploadedUrl = await uploadFileToFirebase(
          currentFile.originFileObj,
          "assignments" // You can specify a different folder if needed
        );
        setContentUrl(uploadedUrl);
        setFileList([
          {
            uid: currentFile.uid,
            name: currentFile.name,
            status: "done",
            url: uploadedUrl,
          },
        ]);
        message.success(`${currentFile.name} uploaded successfully.`);
      } catch (error) {
        //console.error("Upload failed:", error);
        message.error(`${currentFile.name} upload failed.`);
        setFileList([]);
      } finally {
        setUploadingFile(false);
      }
    }
  };

  /**
   * Handle File Removal
   */
  const handleRemove = () => {
    setFileList([]);
    setContentUrl("");
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
          flexWrap: "wrap",
        }}
      >
        <Title level={2} style={{ marginBottom: "10px", color: "#bdc9d3" }}>
          Assignment Details
        </Title>
        <div
          className="header-actions"
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
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

      {/* Assignments as Cards */}
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 4,
        }}
        dataSource={filteredAssignments}
        loading={loadingAssignments}
        renderItem={(assignment) => (
          <List.Item key={assignment._id}>
            <Card
              title={` ${assignment.batch_id.batch_name}`}
              extra={
                <Button
                  type="link"
                  onClick={() => handleViewResponses(assignment._id)}
                  style={{
                    marginRight: "10px",
                    padding: "10px",
                    borderRadius: "10px",
                    backgroundColor: "#ff007a",
                    borderColor: "#ff007a",
                    color: "#fff",
                  }}
                >
                  View Responses
                </Button>
              }
              actions={[
                <Popconfirm
                  title="Are you sure to delete this assignment?"
                  onConfirm={() => confirmDeleteAssignment(assignment._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger>
                    Delete
                  </Button>
                </Popconfirm>,
              ]}
              bordered
              hoverable
            >
              <p>
                <Text strong>Teacher:</Text> {assignment.teacher_id.user_id.name}
              </p>
              <p>
                <Text strong>Expiry Date:</Text>{" "}
                {new Date(assignment.expiry_date).toLocaleString()}
              </p>
              <p>
                <Text strong>Content:</Text>{" "}
                <Link
                  href={assignment.content_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#ff007a" }}
                >
                  View Content
                </Link>
              </p>
            </Card>
          </List.Item>
        )}
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
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              name="batch_id"
              label="Select Batch"
              rules={[{ required: true, message: "Please select a batch." }]}
            >
              <Select
                placeholder="Select a batch"
                loading={loadingBatches}
                notFoundContent={
                  loadingBatches ? <Spin size="small" /> : "No batches available"
                }
              >
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

            {/* Upload Content File */}
            <Form.Item label="Upload Content File" required>
              <Upload
                beforeUpload={() => false} // Prevent automatic upload
                onChange={handleFileChange}
                fileList={fileList}
                accept=".pdf,.doc,.docx,.ppt,.pptx" // Adjust as needed
                maxCount={1}
                onRemove={handleRemove}
              >
                <Button icon={<UploadOutlined />} disabled={uploadingFile}>
                  Click to Upload
                </Button>
              </Upload>
              {contentUrl && (
                <div style={{ marginTop: "10px" }}>
                  <Link
                    href={contentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Uploaded File
                  </Link>
                </div>
              )}
              {!contentUrl && submitting && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  Please upload a file.
                </div>
              )}
            </Form.Item>

            <Form.Item
              name="expiry_date"
              label="Expiry Date"
              rules={[
                { required: true, message: "Please select an expiry date." },
              ]}
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
                loading={submitting}
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

      {/* Loading Indicator for Submitting */}
      {submitting && (
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
