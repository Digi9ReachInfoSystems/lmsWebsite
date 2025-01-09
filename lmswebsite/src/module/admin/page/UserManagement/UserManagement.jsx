import React, { useState, useEffect } from "react";
import { getAllStudents } from "../../../../api/studentApi"; // <-- Add createStudentApi import
import { getAllTeachers } from "../../../../api/teacherApi";
import { UserManagementWrap } from "./UserManagement.styles";
import { Input, Select, Table, Modal,  message, Form, Button } from "antd";
import Lottie from "lottie-react";
import Animation from "../../../admin/assets/Animation.json";
import { useNavigate } from "react-router-dom";
import { getBoards } from "../../../../api/boardApi";
import { getClassesByBoardId } from "../../../../api/classApi";
import { getSubjectsByClassId } from "../../../../api/subjectApi";
import { getTypeOfBatchById, getTypeOfBatchBySubjectId } from "../../../../api/typeOfBatchApi";
import { set } from "lodash";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signupUser } from "../../../../api/authApi";
import { studentAccountCreated, studentSignedUpAdmin } from "../../../../api/mailNotificationApi";
import { auth } from "../../../../config/firebaseConfig";

const { Option } = Select;

export default function UserManagement() {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("students");
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [subject, setSubject] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [boards, setBoards] = useState([]);
  const [typeOfBatch, setTypeOfBatch] = useState([]);
  const [selectedTypeOfBatch, setSelectedTypeOfBatch] = useState('');
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  // ---- NEW STATES FOR MODAL ----
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); // Ant Design form instance

  useEffect(() => {
    const apiCaller = async () => {
      const response = await getBoards();
      console.log(response);

      setBoards(response);
    };
    apiCaller();
  }, []);
  useEffect(() => {
    const fetchClasses = async () => {
      if (selectedBoard) {
        try {
          const classData = await getClassesByBoardId(selectedBoard);
          console.log("Fetched Classes:", classData);
          setClasses(classData || []);
        } catch (error) {
          console.error("Error fetching classes:", error);
          message.error("Failed to load classes. Please try again later.");
        }
      } else {
        setClasses([]);
      }
    };

    fetchClasses();
  }, [selectedBoard]);
  useEffect(() => {
    const fetchSubjects = async () => {
      if (selectedClass) {
        try {
          const subjectData = await getSubjectsByClassId(selectedClass);
          console.log("Fetched Subjects:", subjectData);
          setSubject(subjectData || []);
        } catch (error) {
          console.error("Error fetching subjects:", error);
          message.error("Failed to load subjects. Please try again later.");
        }
      } else {
        setSubject([]);
      }
    };
    fetchSubjects();
  }, [selectedClass])

  useEffect(() => {
    const fetchData = async () => {
      console.log(selectedSubject);
      const data = await getTypeOfBatchBySubjectId(selectedSubject);
      console.log(data);
      setTypeOfBatch(data);
    };
    fetchData();
  }, [selectedSubject]);

  // Fetch data whenever statusFilter changes (students/teachers)
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (statusFilter === "students") {
        const studentData = await getAllStudents(); // fetch students
        setColumns([
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Email", dataIndex: "email", key: "email" },
          { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
          { title: "Class Level", dataIndex: "classLevel", key: "classLevel" },
        ]);

        if (studentData) {
          const formattedData = studentData.map((student) => ({
            key: student._id,
            name: student.user_id?.name || "N/A",
            email: student.user_id?.email || "N/A",
            phoneNumber: student.phone_number || "N/A",
            classLevel: student.class?.classLevel || "N/A",
          }));
          setOriginalData(formattedData);
          setData(formattedData);
        }
      } else if (statusFilter === "teachers") {
        const teacherData = await getAllTeachers(); // fetch teachers
        setColumns([
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Email", dataIndex: "email", key: "email" },
          { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
          { title: "Qualification", dataIndex: "qualification", key: "qualification" },
        ]);

        if (teacherData) {
          const formattedData = teacherData.teachers.map((teacher) => ({
            key: teacher._id,
            name: teacher.user_id?.name || "N/A",
            email: teacher.user_id?.email || "N/A",
            phoneNumber: teacher.phone_number || "N/A",
            qualification: teacher.qualifications || "N/A",
          }));
          setOriginalData(formattedData);
          setData(formattedData);
        }
      }
    };

    fetchData().finally(() => setLoading(false));
  }, [statusFilter]);

  // Filter data when search input changes
  useEffect(() => {
    const filteredData = originalData.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(searchInput.toLowerCase())
    );
    setData(filteredData);
  }, [searchInput, originalData]);

  // Loading Animation
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

  // ---- HANDLERS FOR MODAL ----
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // reset form fields if needed
  };


  const handleBoardChange = (value) => {
    setSelectedBoard(value);
    form.setFieldsValue({ class_id: undefined }); // Reset class selection
  };
  const handleClassChange = (value) => {
    setSelectedClass(value);
  };
  const handleSubjectChange = (value) => {
    setSelectedSubject(value);
  }
  const handleTypeOfBatchChange = (value) => {
    setSelectedTypeOfBatch(value);
  }
  const handleDurationChange = async (value) => {
    const data = await getTypeOfBatchById(selectedTypeOfBatch);
    console.log(data);
    let total = (data.price * value)
    total = total + ((total / 100) * 18);
    setAmount(total);
    form.setFieldsValue({ amount: total });
  }
  const handleSubmit = async (values) => {
    console.log("Student Form Values:", values);
    setIsSubmitting(true);
    try {
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      const oldSessionData = JSON.parse(localStorage.getItem("sessionData"));

      // Send email verification
      await sendEmailVerification(user);
      localStorage.setItem(
        "sessionData",
        JSON.stringify({
          accessToken: user.accessToken,
          refreshToken: userCredential._tokenResponse.refreshToken,
        })
      );

      // Upload profile image
      let profileImageUrl = "";
      if (values.profile_image && values.profile_image.length > 0) {
        profileImageUrl = await uploadFileToFirebase(
          values.profile_image[0].originFileObj,
          "studentProfile"
        );
      }

      // Prepare data to send to API
      const data = {
        role: "student",
        access_token: user.accessToken,
        refresh_token: userCredential._tokenResponse.refreshToken,
        class_id: values.class_id,
        profile_image: profileImageUrl,
        phone_number: values.phone_number,
        student_name: values.student_name,
        studentGender: values.studentGender,
        studentDOB: values.studentDOB,
        board_id: values.board_id,
        subject_id: values.subject_id,
        type_of_batch: values.typeOfBatch,
        duration: values.duration,
        amount: values.amount,
        is_paid:true,
      };

      console.log("Submitting Student Data:", data);
      await signupUser(data);
      await studentAccountCreated( values.student_name, values.email, values.password);
      await studentSignedUpAdmin( values.student_name, values.email);

      // Clear local storage and navigate to login
      // localStorage.clear();
      message.success("Registration successful! Please verify your email.");
      message.success("Registration Successful!");
      localStorage.setItem("sessionData", JSON.stringify(oldSessionData));
      handleCancel();
      // navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.message || "Registration failed. Please try again.";
      message.error(`Registration failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <UserManagementWrap>
      <div className="area-row ar-one">
        <h2 className="UserManagement-batch_title">User Management</h2>
        <div className="UserManagement-controls">
          <Input
            className="UserManagement-search"
            placeholder={`Search by ${statusFilter === "students" ? "Student" : "Teacher"} Name`}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div className="UserManagement-filter">
            <Select
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              className="UserManagement-dropdown"
            >
              <Option value="students">Students</Option>
              <Option value="teachers">Teachers</Option>
            </Select>
          </div>
          {/* --- NEW: Create Student Button (visible when statusFilter=students) --- */}
          {statusFilter === "students" && (
            <Button type="primary" onClick={showModal} >
              Create Student
            </Button>
          )}
        </div>


      </div>

      <div className="area-row ar-three">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          bordered
          rowKey={(record) => record.key}
        />
      </div>

      {/* --- MODAL FOR CREATING A NEW STUDENT --- */}
      <Modal
        title="Create New Student"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // we'll use Form submit instead
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ student_email: "" }}
        >
          <Form.Item
            name="student_name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter your phone number" },
              {
                pattern: /^\d{10}$/,
                message: "Phone number must be 10 digits",
              },
            ]}
          >
            <Input placeholder="Phone Number" maxLength={10} />
          </Form.Item>

          <Form.Item
            name="board_id"
            label="Select Board"
            rules={[{ required: true, message: "Please select a board" }]}
          >
            <Select
              placeholder="Select Board"
              onChange={handleBoardChange}
              allowClear
            >
              {boards.map((b) => (
                <Option key={b._id} value={b._id}>
                  {b.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="class_id"
            label="Select Class"
            rules={[
              { required: true, message: "Please select at least one class" },
            ]}
          >
            <Select placeholder="Select Class" allowClear
              onChange={handleClassChange}
            >
              {classes.map((cls) => (
                <Option key={cls._id} value={cls._id}>
                  {cls.classLevel} - {cls.className}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="subject_id"
            label="Select Subject"
            rules={[
              { required: true, message: "Please select at least one subject" },
            ]}
          >
            <Select placeholder="Select Subject" allowClear
              onChange={handleSubjectChange}
            >
              {subject.map((sub) => (
                <Option key={sub._id} value={sub._id}>
                  {sub.subject_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="typeOfBatch"
            label="Select Type of Batch"
            rules={[
              { required: true, message: "Please select at least one Type Of Batch" },
            ]}
          >
            <Select placeholder="Select Type of Batch" allowClear
              onChange={handleTypeOfBatchChange}
            >
              {typeOfBatch.map((batch) => (
                <Option key={batch._id} value={batch._id}>
                  {batch.mode}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="duration"
            label="Select Duration"
            rules={[
              { required: true, message: "Please select at least Duration" },
            ]}
          >
            <Select placeholder="Select Duration" allowClear
              onChange={handleDurationChange}
            >

              <Option key={"1"} value={1}>
                1 Month
              </Option>
              <Option key={"4"} value={4}>
                4 Month
              </Option>
              <Option key={"8"} value={8}>
                8 Month
              </Option>
              <Option key={"10"} value={10}>
                10 Month
              </Option>

            </Select>
          </Form.Item>
          {selectedTypeOfBatch && <Form.Item
            name="amount"
            label="Amount"
          >
            <Input placeholder="Phone Number" maxLength={10} readOnly value={amount} />
          </Form.Item>}


          <Form.Item
            name="studentGender"
            label="Select Gender"
            rules={[{ required: true, message: "Please select your gender" }]}
          >
            <Select placeholder="Select Gender" allowClear>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              style={{
                width: "100%",
                backgroundColor: "purple",
                borderColor: "purple",
                color: "#fff",
                height: "40px",
              }}
            >
             Create Student
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </UserManagementWrap>
  );
}
