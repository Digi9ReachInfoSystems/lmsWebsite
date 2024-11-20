import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Input, Select, Button, Upload, Form, message } from "antd";
import Header from "../../components/Header/Header";
import studentApplicationImage from "../../../../assets/SignUpImage.png";

import {
  ApplicationContainer,
  ApplicationImage,
  TeacherFormImage,
  ApplicationDetails,
  UploadButton,
  StyledRow,
  StyledCol,
  AvailableSlotsContainer,
  Slot,
} from "./StudentLandingPage.style";
import StudentEnrollmentVideoView from "../../components/StudentEnrollmentVideoView/StudentEnrollmentVideoView";
import StudentEnrollmentReviews from "../../components/StudentEnrollmentReviews/StudentEnrollmentReviews";
import TeachersSection from "../../components/TeacherSection/TeachersSection";
import StudentExistingPackages from "../../components/StudentExistingPackages/StudentExistingPackages";
import Footer2 from "../../components/Footer2/Footer2";
import { getUserByAuthId } from "../../../../api/userApi";
import { getStudentByAuthId, getStudentById } from "../../../../api/studentApi";
import PaymentComponent from "../../components/PaymentComponent/PaymentComponet";
import { useNavigation } from "react-router-dom";
import { getClassesByBoardId } from "../../../../api/classApi";
import { getPackageByClassId } from "../../../../api/packagesApi";
import { getSubjects } from "../../../../services/createBatch";

const { Option } = Select;

const StudentLandingPage = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const [studentDataForm, setStudentDataForm] = useState();
  const [classData, setClassData] = useState([]);
  const [studentClass, setStudentClass] = useState();
  const [packagesData, setPackagesData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [slectedSubject, setSelectedSubject] = useState([]);
  // const navigate = useNavigation();

  useEffect(() => {

    const apiCaller = async () => {
      try {
        
        const sessionData = JSON.parse(localStorage.getItem("sessionData"));
        if (!sessionData || !sessionData.userId) {
          console.error("No session data found.");
          return;
        }
        // Await the user data if getUserByAuthId returns a promise
        const user = await getUserByAuthId(sessionData.userId);
        if (!user) {
          console.error("User not found.");
          return;
        }
        const data = await getStudentByAuthId(sessionData.userId);
        console.log("studentData", data);

        if (!data || !data.student) {
          console.error("Student data not found.");
          return;
        }
        console.log("studentData", data);
        setStudentData(data);
        setStudentDataForm(studentData);
        const packageResponse = await getPackageByClassId(data.student.class._id);
        setPackagesData(packageResponse);
        console.log("packageResponse", data.student.class._id, "gg", packageResponse);
        const subjectResponse = await getSubjects(data.student.class._id);
        setSubjects( subjectResponse);
        console.log("subjectResponse", subjectResponse);
        const response = await getClassesByBoardId(data.student.board_id._id);
        setClassData(response);

      } catch (error) {
        console.error("API Caller Error:", error);
      }
    }

    apiCaller();
  }, []);


  const handleSubjectChange = (value) => {
    if (value.length <= 3) {
      setSelectedSubjects(value);
    }
  };

  
  const availableSlots = [
    "5 PM - 6 PM",
    "6 PM - 7 PM",
    "7 PM - 8 PM",
    "8 PM - 9 PM",
    "9 PM - 10 PM",
  ];

  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      setProfilePicture(info.file.originFileObj);
      message.success(`${info.file.name} uploaded successfully.`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
    console.log("Profile Picture:", profilePicture);
  };

  return (
    // <>
    //   <PaymentComponent studentId={"673b440c0a1a5ce68d00b6ba"} packageId={"671747d2910af0710551a0d3"} amount={"1000"} /> 

    // </>
    <> {
      studentDataForm &&
      <>
        <Header />
        <ApplicationContainer>
          <ApplicationImage>
            <TeacherFormImage
              src={studentApplicationImage}
              alt="teacherFormImage"
            />
          </ApplicationImage>
          <ApplicationDetails>
            <h2>Create your own package!</h2>
            <p>Add subjects of your choice to enroll..!</p>

            <Form layout="vertical" onFinish={handleSubmit}>
              {/* Row 1: Name, Email, Phone */}
              <StyledRow>
                <StyledCol>
                  <Form.Item
                    label="Name"
                    name="name"

                  >
                    {studentDataForm.student.user_id.name}

                  </Form.Item>
                </StyledCol>
                <StyledCol>
                  <Form.Item
                    label="Email"
                    name="email"

                  >
                    {studentDataForm.student.user_id.email}

                  </Form.Item>
                </StyledCol>
                <StyledCol>
                  <Form.Item
                    label="Phone"
                    name="phone"

                  >
                    {studentDataForm.student.phone_number}
                  </Form.Item>
                </StyledCol>
              </StyledRow>

              {/* Row 2: Available Slots */}
              <StyledRow>
                <StyledCol>
                  <Form.Item label="Available Slots">
                    <AvailableSlotsContainer>
                      {availableSlots.map((slot, index) => (
                        <Slot key={index}>{slot}</Slot>
                      ))}
                    </AvailableSlotsContainer>
                  </Form.Item>
                </StyledCol>
              </StyledRow>

              {/* Row 3: Course, Standard, Board */}
              <StyledRow>
                <StyledCol>
                  <Form.Item
                    label="Select Board"
                    name="board"


                  >{studentDataForm.student.board_id.name}

                  </Form.Item>
                </StyledCol>
                <StyledCol>
                  <Form.Item
                    label="Select Class"
                    name="class"

                  >
                    {studentDataForm.student.class.classLevel}

                  </Form.Item>
                </StyledCol>
                <StyledCol>
                  <Form.Item
                    label="Select Subjects (Minimum 3)"
                    name="subjects"
                    rules={[
                      {
                        required: true,
                        message: "Please select more 3 subjects",
                      },
                      ( ) => ({
                        validator(_, value) {
                          if (value && value.length >= 3) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("You must select exactly 3 subjects")
                          );
                        },
                      }),
                    ]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Select subjects..."
                    
                      options={subjects.map((subject) => ({
                        value: subject._id,
                        label: subject.subject_name,
                      }))}
                      onChange={(options) => {
                        // setSelectedSubject(slectedSubject.concat(options));
                        setSelectedSubject(options);
                        console.log("Selected subjects:", slectedSubject.map((option) => option.value));
                      }}
                    />

                   

                  </Form.Item>
                </StyledCol>
              </StyledRow>

              {/* Submit Button */}
              <StyledRow style={{ justifyContent: "flex-end" }}>
                <StyledCol>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        background:
                          "linear-gradient(90deg, #E82C86 0%, #82194B 100%)",
                        borderColor: "#82194B",
                      }}
                    >
                      Submit Application
                    </Button>

                  </Form.Item>
                </StyledCol>
              </StyledRow>
            </Form>
          </ApplicationDetails>
        </ApplicationContainer>
        <StudentExistingPackages data={packagesData} />
        <StudentEnrollmentVideoView />
        <TeachersSection />
        <StudentEnrollmentReviews />
        <Footer2 />
      </>
    }

    </>
  );
};

export default StudentLandingPage;
