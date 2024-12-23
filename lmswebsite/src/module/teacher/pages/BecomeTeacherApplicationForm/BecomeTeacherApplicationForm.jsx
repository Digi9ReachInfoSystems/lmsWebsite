// BecomeTeacherApplicationForm.jsx

import React, { useEffect, useState } from "react";
import { Form, Input, Select, Upload, Button, message, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// import Header from "../../components/Header/Header";
// import Header from "../../components/Navbar/Navbar";
import LMS from "../../components/LMS/LMS";
import BecomeTeacherLogo from "../../assets/becomeTeacherLogo.png";
import { submitTeacherApplication } from "../../../../api/teachersApplicationApi";
import TeachersSection from "../../components/TeacherSection/TeachersSection";
import FooterTeacher from "../../components/Footer/FooterTeacher";
import { getAllClasses, getClassesByBoardId } from "../../../../api/classApi";
import { getSubjects } from "../../../../services/createBatch";
import api from "../../../../config/axiosConfig";
import { getBoards } from "../../../../api/boardApi";
import {
  ApplicationContainer,
  StyledForm,
  Processing,
} from "./BecomeTeacherApplicationForm.styles";
import { useNavigate } from "react-router-dom";
import { getAllSubjects } from "../../../../api/subjectApi";
import LoadingPage from "../../../../pages/LoadingPage/LoadingPage";
import { updateAccessToken } from "../../../../api/refreshTokenApi";
import {
  Heading,
  Subheading,
  PrimaryButton,
} from "../../../../style/PrimaryStyles/PrimaryStyles";
import Animation from "../../../teacher/assets/Animation.json";
import Lottie from "lottie-react";
import HeaderSection from "../../../../Main/Pages/NavBar/navbar";
import MeetOurTeacher from "../../../../Main/Pages/Meetourteacher/Meetourteacher";
import Faq from "../../../../Main/Pages/Faqs/Faq";
import ChooseUs from "../../../../Main/Components/ChooseUs/ChooseUs";
import Footer from "../../../../Main/Components/Footer/Footer";

const { Option } = Select;

const BecomeTeacherApplicationForm = () => {
  const [formVisibility, setFormVisibility] = useState(true);
  const [formProcessing, setFormProcessing] = useState(false);
  const [formReject, setFormReject] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Since we are no longer relying on user sessions,
    // we remove all checks related to user data or application status.
    // Now we simply load boards and show the form directly.

    const loadBoards = async () => {
      try {
        setLoading(true);
        const board = await getBoards();
        setBoardData(board);
        updateAccessToken();
      } catch (err) {
        console.error("Error loading boards:", err);
      } finally {
        setLoading(false);
      }
    };
    loadBoards();
  }, []);

  useEffect(() => {
    const loadClasses = async () => {
      setLoading(true);
      try {
        if (selectedBoard) {
          const classData = await getClassesByBoardId(selectedBoard);
          setClasses(classData);
        } else {
          setClasses([]);
        }
      } catch (err) {
        console.error("Error loading classes:", err);
      } finally {
        setLoading(false);
      }
    };
    loadClasses();
  }, [selectedBoard]);

  useEffect(() => {
    const loadSubjects = async () => {
      setLoading(true);
      try {
        if (selectedClass.length > 0) {
          let fetchedSubjects = [];
          for (const item of selectedClass) {
            const data = await getSubjects(item);
            fetchedSubjects = [...fetchedSubjects, ...data];
          }
          setSubjects(fetchedSubjects);
        } else {
          setSubjects([]);
        }
      } catch (err) {
        console.error("Error loading subjects:", err);
      } finally {
        setLoading(false);
      }
    };
    loadSubjects();
  }, [selectedClass]);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      // Direct application submission without user session
      const submissionData = {
        name: values.name,
        email: values.email,
        phone_number: values.phone_number,
        class_id: values.class_id,
        subject_id: values.subject_id,
        state: values.state,
        city: values.city,
        pincode: values.pincode,
        current_position: values.current_position,
        experience: values.experience,
        // language: values.language,
        resume_link: values.resume[0].originFileObj,
        profileImage: values.profileImage[0].originFileObj,
        board_id: values.board_id,
        qualifications: values.qualification,
        dateOfBirth: values.dob,
      };

      const response = await submitTeacherApplication(submissionData);

      message.success("Application submitted successfully!");
      // Redirect or reload as needed
      navigate("/teacher");
    } catch (error) {
      message.error("Failed to submit the application. Please try again.");
      console.error(
        "Application Submission Error:",
        error.response?.data || error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
    <>
      <HeaderSection />
      {formVisibility && !formProcessing && !formReject && (
        <ApplicationContainer>
          {/* <div className="applicationImage">
              <img
                src={BecomeTeacherLogo}
                alt="Teacher Form"
                className="teacherformImage"
              />
            </div> */}
          <div className="applicationDetails">
            <Heading>Love Teaching Students? Join Us</Heading>
            <Subheading>
              Become a Teacher and train students all around the world.
            </Subheading>
            <StyledForm>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                  language: "",
                  current_position: "",
                }}
              >
                <div className="applicationRowOne">
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your name",
                      },
                      {
                        max: 50,
                        message: "Name cannot exceed 50 characters",
                      },
                      {
                        pattern: /^[A-Za-z\s]+$/,
                        message: "Please enter a valid name (letters only)",
                      },
                    ]}
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
                    name="phone_number"
                    label="Phone Number"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your phone number",
                      },
                      {
                        pattern: /^\d{10}$/,
                        message: "Phone number must be 10 digits",
                      },
                    ]}
                  >
                    <Input placeholder="Phone Number" maxLength={10} />
                  </Form.Item>
                </div>

                <div className="applicationRowTwo">
                  <Form.Item
                    name="state"
                    label="State"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your state",
                      },
                      {
                        max: 50,
                        message: "State cannot exceed 50 characters",
                      },
                    ]}
                  >
                    <Input placeholder="State" />
                  </Form.Item>

                  <Form.Item
                    name="city"
                    label="City"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your city",
                      },
                      {
                        max: 50,
                        message: "City cannot exceed 50 characters",
                      },
                    ]}
                  >
                    <Input placeholder="City" />
                  </Form.Item>

                  <Form.Item
                    name="pincode"
                    label="Pin Code"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your pin code",
                      },
                      {
                        pattern: /^\d{6}$/,
                        message: "Pin code must be 6 digits",
                      },
                    ]}
                  >
                    <Input placeholder="Enter PinCode" maxLength={6} />
                  </Form.Item>
                </div>

                <div className="applicationRowTwo">
                  <Form.Item
                    name="qualification"
                    label="Qualification"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your qualification",
                      },
                    ]}
                  >
                    <Input placeholder="Qualification" />
                  </Form.Item>
                  <Form.Item
                    name="experience"
                    label="Experience (Years)"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your experience",
                      },
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

                  <Form.Item
                    name="current_position"
                    label="Current Position"
                    rules={[
                      {
                        required: true,
                        message: "Please select your position",
                      },
                    ]}
                  >
                    <Select placeholder="Select Position">
                      <Option value="Teacher">Teacher</Option>
                      <Option value="Assistant">Assistant</Option>
                      <Option value="Principal">Principal</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="dob"
                    label="Date of Birth"
                    rules={[
                      {
                        required: true,
                        message: "Please select your date of birth",
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="Select Date"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>

                <div className="applicationRowThree">
                  {/* <Form.Item
                      name="language"
                      label="Language"
                      rules={[
                        {
                          required: true,
                          message: "Please select your language",
                        },
                      ]}
                    >
                      <Select placeholder="Select Language">
                        <Option value="English">English</Option>
                        <Option value="Hindi">Hindi</Option>
                        <Option value="Spanish">Spanish</Option>
                        <Option value="French">French</Option>
                      </Select>
                    </Form.Item> */}

                  <Form.Item
                    name="resume"
                    label="Upload Resume"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                      {
                        required: true,
                        message: "Please upload your resume",
                      },
                    ]}
                  >
                    <Upload
                      name="resume"
                      beforeUpload={() => false}
                      accept=".pdf,.doc,.docx"
                      maxCount={1}
                    >
                      <Button icon={<UploadOutlined />}>
                        Click to Upload Resume
                      </Button>
                    </Upload>
                  </Form.Item>

                  <Form.Item
                    name="profileImage"
                    label="Upload Profile Image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                      {
                        required: true,
                        message: "Please upload your profile image",
                      },
                    ]}
                  >
                    <Upload
                      name="profileImage"
                      beforeUpload={() => false}
                      accept=".jpg,.jpeg,.png"
                      maxCount={1}
                    >
                      <Button icon={<UploadOutlined />}>
                        Click to Upload Profile Image
                      </Button>
                    </Upload>
                  </Form.Item>
                </div>

                <Form.Item
                  name="board_id"
                  label="Select Board"
                  rules={[
                    {
                      required: true,
                      message: "Please select a board",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Board"
                    onChange={(value) => {
                      setSelectedBoard(value);
                      setSelectedClass([]);
                      setSelectedSubject([]);
                      form.setFieldsValue({ class_id: undefined });
                      form.setFieldsValue({ subject_id: undefined });
                    }}
                    allowClear
                  >
                    {boardData.map((board) => (
                      <Option key={board._id} value={board._id}>
                        {board.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <div className="applicationRowThree">
                  {selectedBoard && (
                    <Form.Item
                      name="class_id"
                      label="Select Classes"
                      rules={[
                        {
                          required: true,
                          message: "Please select at least one class",
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Select classes..."
                        onChange={(values) => {
                          setSelectedClass(values);
                          setSelectedSubject([]);
                          form.setFieldsValue({ subject_id: undefined });
                        }}
                        allowClear
                      >
                        {classes.map((classItem) => (
                          <Option key={classItem._id} value={classItem._id}>
                            {classItem.classLevel} - {classItem.className}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                </div>

                <div className="applicationRowThree">
                  {subjects.length > 0 && (
                    <Form.Item
                      name="subject_id"
                      label="Select Subjects"
                      rules={[
                        {
                          required: true,
                          message: "Please select at least one subject",
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Select subjects..."
                        onChange={(values) => setSelectedSubject(values)}
                        allowClear
                      >
                        {subjects.map((subject) => (
                          <Option key={subject._id} value={subject._id}>
                            {subject.subject_name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                </div>

                <Form.Item>
                  <Button
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "auto",
                      backgroundColor: "#6A11CB",
                      color: "white",
                      padding: "20px 20px",
                      borderRadius: "8px",
                      fontSize: "20px",
                    }}
                    htmlType="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </Form.Item>
              </Form>
            </StyledForm>
          </div>
        </ApplicationContainer>
      )}

      <Processing visible={formProcessing || formReject}>
        <div className="applicationUnderProcessing">
          {formProcessing && <p>Application Under Processing....!!!!</p>}
        </div>
        <div>
          {formReject && <p>Application Rejected... Better Luck Next Time</p>}
        </div>
      </Processing>

      {/* <LMS /> */}

      {/* <TeachersSection />
       */}
      <MeetOurTeacher />
      <Footer />
    </>
  );
};

export default BecomeTeacherApplicationForm;
