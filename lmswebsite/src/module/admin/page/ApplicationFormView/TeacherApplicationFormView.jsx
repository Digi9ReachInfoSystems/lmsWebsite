// src/components/TeacherApplicationFormView.jsx

import React, { useEffect, useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import {
  Table,
  Input,
  Button,
  Select,
  Modal,
  Form,
  Upload,
  message,
  DatePicker,
} from "antd";
import { TeacherApplicationFormViewWrap } from "./TeacherApplicationFormView.styles";
import {
  getTeacherApplications,
  submitTeacherApplication,
} from "../../../../api/teachersApplicationApi";
import { getBoards } from "../../../../api/boardApi";
import { getClassesByBoardId } from "../../../../api/classApi";
import { getSubjectsByClassId } from "../../../../api/subjectApi";

import TeacherApplicationFormReview from "../TeachersApplicationFormReview/TeacherApplicationFormReview";
import Animation from "../../../admin/assets/Animation.json";
import Lottie from "lottie-react";
import { PlusOutlined } from "@ant-design/icons";
import { uploadFileToFirebase } from "../../../../utils/uploadFileToFirebase";
import { updateUserByAuthId } from "../../../../api/userApi"; // Import updateUserByAuthId
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../../../config/firebaseConfig";
import { signupUser } from "../../../../api/authApi";
import { createTeacher } from "../../../../api/teacherApi";
import moment from "moment";

const { Option } = Select;

export default function TeacherApplicationFormView() {
  const [searchInput, setSearchInput] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherId, setTeacherId] = useState("");
  const [loading, setLoading] = useState(false);

  // State for Create Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [form] = Form.useForm(); // Ant Design form instance
  const [uploading, setUploading] = useState(false);

  // States for Boards, Classes, and Subjects
  const [boards, setBoards] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Handlers to open and close modals
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    form.resetFields(); // Reset form fields when modal closes

    // Reset Classes and Subjects when modal closes
    setClasses([]);
    setSubjects([]);
  };

  // Handler for Create button
  const handleCreate = () => {
    openCreateModal();
  };

  // Columns for the Ant Design Table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Button
          className="status-button"
          type="link"
          onClick={() => {
            setTeacherId(record.id);
            openModal();
          }}
        >
          {text.charAt(0).toUpperCase() + text.slice(1)}
        </Button>
      ),
    },
  ];

  // Fetch Teacher Applications based on statusFilter
  useEffect(() => {
    const apiCaller = async () => {
      try {
        setLoading(true);
        const data = await getTeacherApplications(statusFilter);
        if (data && Array.isArray(data.applications)) {
          const transformedData = data.applications.map((teacher) => ({
            id: teacher._id?.$oid || teacher._id, // Extract $oid or use _id directly if already a string
            name: teacher?.teacher_name || "N/A",
            email: teacher?.email || "N/A",
            date: new Date(teacher.date_applied).toLocaleDateString() || "N/A",
            status: teacher.approval_status || "N/A",
          }));
          setOriginalData(transformedData);
          setFilterData(transformedData);
        } else {
          message.error("Unexpected data format for teacher applications.");
        }
      } catch (error) {
        console.error("Error fetching teacher applications:", error);
        message.error("Failed to fetch teacher applications.");
      } finally {
        setLoading(false);
      }
    };
    apiCaller();
  }, [statusFilter]);

  // Fetch Boards on Component Mount
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const boardsData = await getBoards();
        ////console.log("Fetched Boards Data:", boardsData); // For debugging

        // Check if boardsData is an array
        if (Array.isArray(boardsData)) {
          const transformedBoards = boardsData.map((board) => ({
            id: board._id?.$oid || board._id, // Extract $oid or use _id directly if already a string
            name: board.name,
          }));
          setBoards(transformedBoards);
        } else {
          message.error("Unexpected data format received for boards.");
        }
      } catch (error) {
        console.error("Error fetching boards:", error);
        message.error("Failed to fetch boards.");
      }
    };
    fetchBoards();
  }, []);

  // Fetch Classes when a Board is selected
  const handleBoardChange = async (value) => {
    try {
      form.setFieldsValue({ class_id: [], subject_id: [] }); // Reset class and subject selections
      setClasses([]);
      setSubjects([]);
      if (value) {
        const classesData = await getClassesByBoardId(value);
        //console.log("Fetched Classes Data:", classesData); // For debugging

        let transformedClasses = [];

        if (Array.isArray(classesData)) {
          transformedClasses = classesData.map((cls) => ({
            id: cls._id, // _id is a string
            name: cls.className, // Use className as the display name
          }));
        } else {
          message.error("Unexpected data format for classes.");
          return;
        }

        setClasses(transformedClasses);
      }
    } catch (error) {
      console.error("Error fetching classes by board ID:", error);
      message.error("Failed to fetch classes for the selected board.");
    }
  };

  // Fetch Subjects when Classes are selected
  const handleClassChange = async (selectedClasses) => {
    try {
      form.setFieldsValue({ subject_id: [] }); // Reset subject selections
      setSubjects([]);
      if (selectedClasses && selectedClasses.length > 0) {
        // Fetch subjects for all selected classes
        const subjectsPromises = selectedClasses.map((classId) =>
          getSubjectsByClassId(classId)
        );
        const subjectsResponses = await Promise.all(subjectsPromises);
        //console.log("Fetched Subjects Data:", subjectsResponses); // For debugging

        // Combine all subjects and remove duplicates based on subject ID
        const combinedSubjects = subjectsResponses
          .flatMap((response) => response) // Assuming each response is an array of subjects
          .reduce((acc, current) => {
            const id = current._id; // _id is a string
            const exists = acc.find((item) => item.id === id);
            if (!exists) {
              return acc.concat([
                {
                  id: id,
                  name: current.subject_name, // Corrected field name
                },
              ]);
            }
            return acc;
          }, []);
        setSubjects(combinedSubjects);
      }
    } catch (error) {
      console.error("Error fetching subjects by class IDs:", error);
      message.error("Failed to fetch subjects for the selected classes.");
    }
  };

  // Filter data based on search input
  useEffect(() => {
    if (searchInput) {
      const filtered = originalData.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchInput.toLowerCase())
        )
      );
      setFilterData(filtered);
    } else {
      setFilterData(originalData);
    }
  }, [searchInput, originalData]);

  // Handler for form submission
  const onFinish = async (values) => {
    try {
      setUploading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      const oldSessionData = JSON.parse(localStorage.getItem("sessionData"));

      localStorage.setItem(
        "sessionData",
        JSON.stringify({
          accessToken: user.accessToken,
          refreshToken: userCredential._tokenResponse.refreshToken,
        })
      );
      //console.log("user", user);
      const userData = await signupUser({
        role: "teacher",
        student_name: values.name,
        email: values.email,
        access_token: user.accessToken,
        refresh_token: userCredential._tokenResponse.refreshToken,
      });

      // Extract and prepare the data
      const applicationData = {
        auth_id: user.uid,
        user_id: userData.user._id,
        teacher_id: "",
        role: "teacher",
        bio:
          values.city +
          " " +
          values.state +
          " " +
          values.pincode +
          " " +
          values.current_position,
        phone_number: values.phone_number,
        experience: values.experience,
        class_id: values.class_id, // Array of class IDs
        subject: values.subject_id, // Array of subject IDs
        board_id: values.board_id, // Single board ID
        qualifications: values.qualifications, // Ensure backend expects 'qualifications'
        dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
        microsoft_id: values.microsoft_id,
        microsoft_password: values.password,
        microsoft_principle_name: values.email,

        // Files will be handled separately
      };

      // Handle file uploads
      const resumeFile = values.resume_link?.fileList?.[0]?.originFileObj;
      const profileImageFile =
        values.profileImage?.fileList?.[0]?.originFileObj;

      if (!resumeFile || !profileImageFile) {
        message.error("Please upload both resume and profile image.");
        setUploading(false);
        return;
      }

      // Upload files to Firebase and get URLs
      const resumeUrl = await uploadFileToFirebase(resumeFile, "resumes");
      const profileImageUrl = await uploadFileToFirebase(
        profileImageFile,
        "profileImages"
      );

      //console.log("Resume URL:", resumeUrl);
      //console.log("Profile Image URL:", profileImageUrl);

      // Add URLs to application data
      applicationData.resume_link = resumeUrl;
      applicationData.profileImage = profileImageUrl;

      // Update user details before submitting the application
      // const sessionData = JSON.parse(localStorage.getItem("sessionData"));
      // if (!sessionData || !sessionData.userId) {
      //   message.error("User not authenticated.");
      //   setUploading(false);
      //   return;
      // }
      // const authId = sessionData.userId;
      // await updateUserByAuthId(authId, {
      //   name: values.name,
      //   phone_number: values.phone_number,
      // });

      // Submit the application
      //console.log("Submitting application:56dbchdb", applicationData);
      // const response = await submitTeacherApplication(applicationData);
      localStorage.setItem("sessionData", JSON.stringify(oldSessionData));
      const response = await createTeacher(applicationData);
      // //console.log("Application submitted successfully:", response);

      message.success("Teacher application submitted successfully!");

      // Refresh the table data
      setStatusFilter("pending"); // Assuming new applications are pending
      // Alternatively, you can fetch the data again if needed

      // Close the modal and reset the form
      closeCreateModal();
    } catch (error) {
      message.error("Failed to submit the application. Please try again.");
      console.error(
        "Error submitting application:",
        error.response?.data || error.message
      );
    } finally {
      setUploading(false);
    }
  };

  // Prevent automatic upload and handle file list
  const normFile = (e) => {
    //console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // Upload Props for Resume
  const uploadResumeProps = {
    beforeUpload: (file) => {
      // Restrict to PDF or DOC/DOCX
      const isAllowed =
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      if (!isAllowed) {
        message.error("You can only upload PDF or Word files!");
      }
      // Prevent automatic upload
      return false;
    },
    maxCount: 1,
    accept: ".pdf,.doc,.docx",
  };

  // Upload Props for Profile Image
  const uploadProfileImageProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
      }
      // Prevent automatic upload
      return false;
    },
    maxCount: 1,
    accept: "image/*",
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
            transform: "scale(0.5)",
            transformOrigin: "center center",
          }}
        >
          <Lottie animationData={Animation} loop={true} />
        </div>
      </div>
    );
  }

  return (
    <TeacherApplicationFormViewWrap className="content-area">
      <div className="area-row ar-one">
        <div
          className="TeachersApplicationFormView-batches_nav"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 className="TeachersApplicationFormView-batch_title">
            Application Form
          </h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              className="TeachersApplicationFormView-search"
              style={{ marginRight: "20px" }}
            >
              <Input
                prefix={<FaSearch />}
                placeholder="Search by Teacher Name"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{ width: "300px" }}
              />
            </div>
            {/* Filter Dropdown */}
            <div
              className="TeachersApplicationFormView-filter"
              style={{ marginRight: "20px" }}
            >
              <div
                className="filter-dropdown"
                style={{ display: "flex", alignItems: "center" }}
              >
                <FaFilter className="filter-icon" />
                <Select
                  value={statusFilter}
                  onChange={(value) => setStatusFilter(value)}
                  style={{ width: "150px", marginLeft: "10px" }}
                >
                  <Option value="pending">Pending</Option>
                  <Option value="rejected">Rejected</Option>
                  <Option value="approved">Approved</Option>
                </Select>
              </div>
            </div>
            {/* Create Button */}
            <div className="TeachersApplicationFormView-create">
              <Button
                type="primary"
                onClick={handleCreate}
                style={{
                  backgroundColor: "#EE1B7A",
                  padding: "1.4em 4em",
                  marginTop: "10px",
                }}
                display="flex"
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="area-row ar-three">
        {filterData.length > 0 ? (
          <Table
            columns={columns}
            dataSource={filterData}
            rowKey={(record) => record.id} // Set row key
            pagination={{ pageSize: 10 }}
          />
        ) : (
          <p>No data found for your search.</p>
        )}
      </div>

      {/* Modal for Viewing Application */}
      <Modal
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
        title="Teacher Application Details"
        width={800}
      >
        {teacherId && (
          <TeacherApplicationFormReview
            teacher_Id={teacherId}
            closeModal={closeModal}
          />
        )}
      </Modal>

      {/* Modal for Creating Application */}
      <Modal
        visible={isCreateModalOpen}
        onCancel={closeCreateModal}
        footer={null}
        title="Create New Teacher Application"
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Name */}

          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the name" },
              {
                pattern: /^[a-zA-Z\s]*$/,
                message:
                  "Name should not contain numbers or special characters",
              },
            ]}
          >
            <Input
              placeholder="Enter name"
              onKeyPress={(e) => {
                if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>

          {/* Microsoft ID */}
          <Form.Item
            label="Microsoft ID"
            name="microsoft_id"
            rules={[
              { required: true, message: "Please enter the Microsoft ID" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter the password" },
              { type: "password", message: "Please enter a valid password" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          {/* State */}

          <Form.Item
            label="State"
            name="state"
            rules={[
              { required: true, message: "Please enter the state" },
              {
                pattern: /^[a-zA-Z\s]*$/,
                message:
                  "State should not contain numbers or special characters",
              },
            ]}
          >
            <Input
              placeholder="Enter state"
              onKeyPress={(e) => {
                if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>

          {/* City */}

          <Form.Item
            label="City"
            name="city"
            rules={[
              { required: true, message: "Please enter the city" },
              {
                pattern: /^[a-zA-Z\s]*$/,
                message:
                  "City should not contain numbers or special characters",
              },
            ]}
          >
            <Input
              placeholder="Enter city"
              onKeyPress={(e) => {
                if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>

          {/* Pincode */}
          <Form.Item
            label="Pincode"
            name="pincode"
            rules={[
              { required: true, message: "Please enter the pincode" },
              {
                pattern: /^\d{6}$/,
                message: "Please enter a valid 6-digit pincode",
              },
            ]}
          >
            <Input placeholder="Enter pincode" maxLength={6} />
          </Form.Item>

          {/* Current Position */}

          <Form.Item
            label="Current Position"
            name="current_position"
            rules={[
              { required: true, message: "Please enter the current position" },
              {
                pattern: /^[a-zA-Z\s]*$/,
                message:
                  "Position should not contain numbers or special characters",
              },
            ]}
          >
            <Input
              placeholder="Enter current position"
              onKeyPress={(e) => {
                if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>

          {/* Language */}

          <Form.Item
            label="Language"
            name="language"
            rules={[
              { required: true, message: "Please enter the language" },
              {
                pattern: /^[a-zA-Z\s]*$/,
                message:
                  "Language should not contain numbers or special characters",
              },
            ]}
          >
            <Input
              placeholder="Enter language"
              onKeyPress={(e) => {
                if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>

          {/* Phone Number */}

          <Form.Item
            label="Phone Number"
            name="phone_number"
            rules={[
              { required: true, message: "Please enter the phone number" },
              {
                pattern: /^\d{10}$/,
                message: "Please enter a valid 10-digit phone number",
              },
            ]}
          >
            <Input
              placeholder="Enter phone number"
              maxLength={10}
              onKeyPress={(e) => {
                // Only allow numbers (digits)
                if (!/^\d$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>

          {/* Experience */}
          <Form.Item
            label="Experience"
            name="experience"
            rules={[
              { required: true, message: "Please enter the experience" },
              {
                type: "number",
                min: 0,
                max: 100,
                message: "Experience must be between 0 and 100",
                transform: (value) => Number(value),
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Enter Experience"
              min={0}
              max={100}
            />
          </Form.Item>

          {/* Board Selection */}
          <Form.Item
            label="Board"
            name="board_id"
            rules={[{ required: true, message: "Please select the board" }]}
          >
            <Select
              placeholder="Select board"
              onChange={handleBoardChange}
              allowClear
            >
              {boards.map((board) => (
                <Option key={board.id} value={board.id}>
                  {board.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Class Selection */}
          <Form.Item
            label="Classes"
            name="class_id"
            rules={[
              { required: true, message: "Please select at least one class" },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select classes"
              onChange={handleClassChange}
              allowClear
              disabled={classes.length === 0}
            >
              {classes.map((cls) => (
                <Option key={cls.id} value={cls.id}>
                  {cls.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Subject Selection */}
          <Form.Item
            label="Subjects"
            name="subject_id"
            rules={[
              { required: true, message: "Please select at least one subject" },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select subjects"
              allowClear
              disabled={subjects.length === 0}
            >
              {subjects.map((subject) => (
                <Option key={subject.id} value={subject.id}>
                  {subject.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Qualifications */}
          <Form.Item
            label="Qualifications"
            name="qualifications" // Ensure this matches backend expectations
            rules={[
              { required: true, message: "Please enter the qualifications" },
            ]}
          >
            <Input.TextArea placeholder="Enter qualifications" rows={3} />
          </Form.Item>

          {/* Date of Birth */}
          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            rules={[
              { required: true, message: "Please select the date of birth" },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              disabledDate={(current) => {
                // Disable dates after today
                return current && current.isAfter(moment().endOf("day"), "day");
              }}
            />
          </Form.Item>

          {/* Resume Upload */}
          <Form.Item
            label="Resume"
            name="resume_link"
            rules={[{ required: true, message: "Please upload the resume" }]}
          >
            <Upload {...uploadResumeProps} listType="text">
              <Button icon={<PlusOutlined />}>Click to Upload Resume</Button>
            </Upload>
          </Form.Item>

          {/* Profile Image Upload */}
          <Form.Item
            label="Profile Image"
            name="profileImage"
            rules={[
              { required: true, message: "Please upload the profile image" },
            ]}
          >
            <Upload {...uploadProfileImageProps} listType="picture">
              <Button icon={<PlusOutlined />}>
                Click to Upload Profile Image
              </Button>
            </Upload>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={uploading}
              style={{ backgroundColor: "#EE1B7A" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </TeacherApplicationFormViewWrap>
  );
}
