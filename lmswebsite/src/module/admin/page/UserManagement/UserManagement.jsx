// src/components/UserManagement.jsx

import React, { useState, useEffect } from "react";
import { getAllStudents } from "../../../../api/studentApi"; // <-- Add createStudentApi import
import { getAllTeachers } from "../../../../api/teacherApi";
import { UserManagementWrap } from "./UserManagement.styles";
import { Input, Select, Table, Modal, message, Form, Button, Space } from "antd";
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
import { getdiscount, getgst } from "../../../../api/pricingApi";
import { createPaymentForCustomPackage } from "../../../../api/paymentsApi";

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
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [boards, setBoards] = useState([]);
  const [typeOfBatchOptions, setTypeOfBatchOptions] = useState([]);
  const [amount, setAmount] = useState(0);
  const [mainAmount, setMainAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const[gstAmount, setGstAmount] = useState(0);
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
          setSubjects(subjectData || []);
        } catch (error) {
          console.error("Error fetching subjects:", error);
          message.error("Failed to load subjects. Please try again later.");
        }
      } else {
        setSubjects([]);
      }
    };
    fetchSubjects();
  }, [selectedClass]);

  useEffect(() => {
    const fetchTypeOfBatch = async () => {
      if (selectedSubject) {
        try {
          const data = await getTypeOfBatchBySubjectId(selectedSubject);
          console.log("Fetched Type of Batch:", data);
          setTypeOfBatchOptions(data || []);
        } catch (error) {
          console.error("Error fetching Type of Batch:", error);
          message.error("Failed to load Type of Batch. Please try again later.");
        }
      } else {
        setTypeOfBatchOptions([]);
      }
    };
    fetchTypeOfBatch();
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
  };
  const handleTypeOfBatchChange = (value) => {
    // Handle if needed
  };


  // const handleDurationChange = async (value, index) => {
  //   const typeOfBatchId = form.getFieldValue(['subjects', index, 'typeOfBatch']);
  //   if (typeOfBatchId) {
  //     try {
  //       const data = await getTypeOfBatchById(typeOfBatchId);
  //       console.log(data);
  //       let total = data.price * value;
  //       total = total + (total / 100) * 18; // Adding 18% tax or similar
  //       setAmount((prev) => prev + total);
  //       form.setFieldsValue({ subjects: [{ amount: total }] }); // Update amount for the specific subject
  //     } catch (error) {
  //       console.error("Error calculating amount:", error);
  //       message.error("Failed to calculate amount. Please try again.");
  //     }
  //   }
  // };

  const handleSubmit = async (values) => {
    // console.log("Student Form Values:", values);
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
      const subArray = values.subjects.map((subject) => ({
        _id: subject.subject_id,
        type_of_batch: subject.typeOfBatch,
        duration: subject.duration,
      }))
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
        subject_id: subArray,
        amount: finalAmount,
        discountAmount: discountAmount,
        gstAmount:gstAmount,
        is_paid: false,
        paymentLink_status: "pending",
      };

      // console.log("Submitting Student Data:", data);
      const res = await signupUser(data);
      // console.log("res", res);
      // res.student._id res.student.amount
      await createPaymentForCustomPackage({
        amount: res.student.amount, student_id: res.student._id
      })
      await studentAccountCreated(values.student_name, values.email, values.password);
      await studentSignedUpAdmin(values.student_name, values.email);

      // Clear local storage and navigate to login
      // localStorage.clear();
      message.success("Registration successful! Please verify your email.");
      message.success("Registration Successful!");
      localStorage.setItem("sessionData", JSON.stringify(oldSessionData));
      // handleCancel();
      // navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.message || "Registration failed. Please try again.";
      message.error(`Registration failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
      window.location.reload();
      form.resetFields(); 
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
            <Button type="primary" onClick={showModal}>
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
        width={800} // Adjust width as needed
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ student_email: "" }}
        >
         <Form.Item
  label="Full Name"
  name="student_name"
  rules={[
    { required: true, message: "Please enter the student's name" },
    {
      pattern: /^[a-zA-Z\s]*$/,
      message: "Only alphabetic characters are allowed",
    },
  ]}
>
  <Input
    placeholder="Enter student's full name"
    onKeyPress={(event) => {
      // Allow only alphabetic characters and space
      if (!/[a-zA-Z\s]/.test(event.key)) {
        event.preventDefault();
      }
    }}
  />
</Form.Item>


          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter the student's email",
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
              { required: true, message: "Please enter a password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter the student's phone number" },
              {
                pattern: /^\d{10}$/,
                message: "Phone number must be 10 digits",
              },
            ]}
          >
            <Input placeholder="Phone Number" maxLength={10}     onKeyPress={(e) => {
      if (!/^\d$/.test(e.key)) {
        e.preventDefault(); // Prevent any non-digit input
      }
    }}  />
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
              { required: true, message: "Please select a class" },
            ]}
          >
            <Select
              placeholder="Select Class"
              allowClear
              onChange={handleClassChange}
            >
              {classes.map((cls) => (
                <Option key={cls._id} value={cls._id}>
                  {cls.classLevel} 
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* --- Dynamic Subjects Section --- */}
          <Form.List name="subjects">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align="baseline"
                  >
                    {/* Subject Selection */}
                    <Form.Item
                      {...restField}
                      name={[name, 'subject_id']}
                      rules={[{ required: true, message: 'Missing subject' }]}
                    >
                      <Select
                        placeholder="Select Subject"
                        onChange={async (value) => {
                          console.log(value);
                          const data = await getTypeOfBatchBySubjectId(value);
                          setTypeOfBatchOptions(data || []);
                          form.setFieldsValue({
                            subjects: [
                              ...form.getFieldValue('subjects').map((subject, idx) =>
                                idx === name
                                  ? { ...subject, typeOfBatch: undefined, duration: undefined, amount: 0 }
                                  : subject
                              ),
                            ],
                          });
                        }}
                        allowClear
                      >
                        {subjects.map((sub) => (
                          <Option key={sub._id} value={sub._id}>
                            {sub.subject_name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    {/* Type of Batch Selection */}
                    <Form.Item
                      {...restField}
                      name={[name, 'typeOfBatch']}
                      rules={[{ required: true, message: 'Missing Type of Batch' }]}
                    >
                      <Select
                        placeholder="Select Type of Batch"
                        onChange={async (value) => {
                          // Optionally, you can fetch additional data or reset duration
                          console.log(value);
                          const data = await getTypeOfBatchById(value);
                          form.setFieldsValue({
                            subjects: [
                              ...form.getFieldValue('subjects').map((subject, idx) =>
                                idx === name
                                  ? { ...subject, duration: undefined, amount: data.price }
                                  : subject
                              ),
                            ],
                          });
                        }}
                        allowClear
                      >
                        {typeOfBatchOptions.map((batch) => (
                          <Option key={batch._id} value={batch._id}>
                            {batch.mode}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    {/* Duration Selection */}
                    <Form.Item
                      {...restField}
                      name={[name, 'duration']}
                      rules={[{ required: true, message: 'Missing Duration' }]}
                    >
                      <Select
                        placeholder="Select Duration"
                        onChange={(value) => {
                          form.setFieldsValue({
                            subjects: [
                              ...form.getFieldValue('subjects').map((subject, idx) =>
                                idx === name
                                  ? { ...subject, duration: value, totalAmount: subject.amount * value }
                                  : subject
                              ),
                            ],
                          });

                          // handleDurationChange(value, name)
                          console.log("fffff ", form.getFieldValue("subjects"))
                        }

                        }
                        allowClear
                      >
                        <Option key={"1"} value={1}>
                          1 Month
                        </Option>
                        <Option key={"4"} value={4}>
                          4 Months
                        </Option>
                        <Option key={"8"} value={8}>
                          8 Months
                        </Option>
                        <Option key={"10"} value={10}>
                          10 Months
                        </Option>
                      </Select>
                    </Form.Item>

                    {/* Amount Display */}
                    <Form.Item
                      {...restField}
                      name={[name, 'totalAmount']}
                      // label="Amount"
                      rules={[{ required: true, message: 'Amount is required' }]}
                    >

                      <Input placeholder="Amount" readOnly />

                    </Form.Item>

                    {/* Remove Subject Button */}
                    <Button type="primary" onClick={() => remove(name)}>
                      Remove
                    </Button>
                  </Space>
                ))}

                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    Add Subject
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item
            name="discount"
            label="Select Discount Percentage"
            rules={[
              { required: true, message: "Please select a Discount" },
            ]}
          >
            <Select
              placeholder="Select Discount"
              allowClear
              onChange={() => {
                setDiscountPercentage(form.getFieldValue("discount"));
              }}
            >

              <Option key={0} value={0}>
                0 %
              </Option>
              <Option key={5} value={5}>
                5 %
              </Option>
              <Option key={10} value={10}>
                10 %
              </Option>
              <Option key={15} value={15}>
                15 %
              </Option>
              <Option key={20} value={20}>
                20 %
              </Option>
              <Option key={25} value={25}>
                25 %
              </Option>
              <Option key={30} value={30}>
                30 %
              </Option>
              <Option key={35} value={35}>
                35 %
              </Option>
              <Option key={40} value={40}>
                40 %
              </Option>
              <Option key={45} value={45}>
                45 %
              </Option>
              <Option key={50} value={50}>
                50 %
              </Option>

            </Select>
          </Form.Item>

          <Button type="primary" onClick={async () => {
            console.log(form.getFieldValue("subjects"))
            let tA = 0;
            form.getFieldValue("subjects").map((subject) => {
              tA = tA + subject.totalAmount;
            })
            // const dis = await getdiscount();
            const dis=discountPercentage
            const gst = await getgst();
            console.log(dis)
            let dA = (tA / 100) * dis;
            setMainAmount(tA);
            setDiscountAmount(dA);
            setGstAmount(((tA - dA) / 100) * gst.gst)
            let fA = ((tA - dA) / 100) * gst.gst;

            setFinalAmount((tA - dA) + fA);
          }} block>
            Get Price
          </Button>

          <Form.Item label="Amount">
            <Input value={mainAmount} readOnly />
          </Form.Item>

          <Form.Item label="Discount">
            <Input value={discountAmount} readOnly />
          </Form.Item>

          {/* Total Amount Display */}
          <Form.Item label="Total Amount">
            <Input value={finalAmount} readOnly />
          </Form.Item>

          <Form.Item
            name="studentGender"
            label="Select Gender"
            rules={[{ required: true, message: "Please select the student's gender" }]}
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
              block
              style={{
                width: "100%",
                backgroundColor: "purple",
                borderColor: "purple",
                color: "#fff",
                height: "40px",
              }}
            >
              {loading ? "Creating..." : "Create student"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </UserManagementWrap>
  );
}
