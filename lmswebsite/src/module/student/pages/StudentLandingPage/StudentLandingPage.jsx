import React, { useEffect, useState } from "react";
import { UploadOutlined, WindowsFilled } from "@ant-design/icons";
import { Input, Select, Button, Upload, Form, message } from "antd";
// import Header from "../../components/Header/Header";
// import studentApplicationImage from "../../../../assets/SignUpImage.png";
import HeaderSection from "../../../../Main/Pages/NavBar/navbar";
import {
  ApplicationContainer,
  // ApplicationImage,
  // TeacherFormImage,
  ApplicationDetails,
  UploadButton,
  StyledRow,
  StyledCol,
  AvailableSlotsContainer,
  Slot,
  CustomPackageStatus,
} from "./StudentLandingPage.style";
import StudentEnrollmentVideoView from "../../components/StudentEnrollmentVideoView/StudentEnrollmentVideoView";
import StudentEnrollmentReviews from "../../components/StudentEnrollmentReviews/StudentEnrollmentReviews";
import TeachersSection from "../../components/TeacherSection/TeachersSection";
import StudentExistingPackages from "../../components/StudentExistingPackages/StudentExistingPackages";
import Footer2 from "../../components/Footer2/Footer2";
import { getUserByAuthId } from "../../../../api/userApi";
import { getStudentByAuthId, getStudentById, updateStudent } from "../../../../api/studentApi";
import PaymentComponent from "../../components/PaymentComponent/PaymentComponet";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getClassesByBoardId } from "../../../../api/classApi";
import { getPackageByClassId } from "../../../../api/packagesApi";
import { getSubjects } from "../../../../services/createBatch";
import { createCustomPackage } from "../../../../api/customPackageApi";
import LoadingPage from "../../../../pages/LoadingPage/LoadingPage";

import { GotoOneToOne } from "../../components/GotoOneToOne/GotoOneToOne";
import { getAllTypeOfBatches } from "../../../../api/typeOfBatchApi";
import { set } from "lodash";
import Footer from "../../../../Main/Pages/Footer/Footer";

export const StudentLandingPage = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const [studentDataForm, setStudentDataForm] = useState();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [classData, setClassData] = useState([]);
  const [studentClass, setStudentClass] = useState();
  const [packagesData, setPackagesData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [batchType, setBatchType] = useState([]);
  const [slot, setSlot] = useState([]);
  const [slectedSubject, setSelectedSubject] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState();
  const navigate = useNavigate();
  // const loaderData= useLoaderData();
  // console.log("loaderData", loaderData);
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

        const batchData = await getAllTypeOfBatches();
        console.log("batchData", batchData);
        setBatchType(batchData);
        if (!data || !data.student) {
          console.error("Student data not found.");
          return;
        }
        console.log("studentData", data);
        setStudentDataForm(data);
        const packageResponse = await getPackageByClassId(
          data.student.class._id,
          "normal"
        );
        setPackagesData(packageResponse);
        console.log(
          "packageResponse",
          data.student.class._id,
          "gg",
          packageResponse
        );
        const subjectResponse = await getSubjects(data.student.class._id);
        setSubjects(subjectResponse);
        console.log("subjectResponse", subjectResponse);
        const response = await getClassesByBoardId(data.student.board_id._id);
        setClassData(response);

        if (
          data.student.custom_package_status == "approved" ||
          (data.student.subscribed_Package != "" && data.student.is_paid == true)
        ) {
          // navigate(
          //   `/student/package/successPage?packageId=${data.student.subscribed_Package}&status=${data.student.custom_package_status}`
          // );
          navigate("/student/dashboard");
        } else if (
          data.student.custom_package_status == "expired" ||
          (data.student.subscribed_Package != "" && data.student.is_paid == false)
        ) {
          // navigate("/student/package/expiryAlert")
          // alert("Your Package has expired. ")
        }
      } catch (error) {
        console.error("API Caller Error:", error);
      }
    };

    apiCaller();
  }, []);

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

  const handleSubmit = () => {
    const submissionData = {
      name: studentDataForm.student.user_id.name,
      student_id: studentDataForm.student._id,
      email: studentDataForm.student.user_id.email,
      phone: studentDataForm.student.phone_number,
      board_id: studentDataForm.student.board_id._id,
      class_id: studentDataForm.student.class._id,
      subjects: slectedSubject,
      // slot: slot,
    };
    console.log("sel");
    console.log("submissionData", submissionData);

    const apiCaller = async () => {
      try {

        const updateStudentData = await updateStudent(studentDataForm.student._id, { updateData: { type_of_batch: selectedBatch } });
        console.log("updateStudentData", updateStudentData);
        const response = await createCustomPackage({
          subject_id: slectedSubject,
          student_id: studentDataForm.student._id,
          // slots: slot,
        });
        console.log("response", response);
        alert("Request submitted   successfully!");
        window.location.reload();
      } catch (err) {
        console.error("Error submitting Packages:", err);
      }
    };
    apiCaller();
  };

  return (
    <>

      {studentDataForm ? (
        <>
          <HeaderSection />
          {/* studentDataForm.student.custom_package_status === "no_package" ||studentDataForm.student.custom_package_status === "expired" */}
          {(studentDataForm.student.custom_package_status === "no_package" || studentDataForm.student.custom_package_status === "expired") ? (
            <ApplicationContainer>
              {/* <ApplicationImage>
                <TeacherFormImage
                  src={studentApplicationImage}
                  alt="teacherFormImage"
                />

              </ApplicationImage> */}
              <ApplicationDetails>
                <div className="studentApplicationDetails">
                <h2>Create your own package!</h2>
                <p>Add subjects of your choice to enroll..!</p>

                <Form layout="vertical" onFinish={handleSubmit}>
                  {/* Row 1: Name, Email, Phone */}
                  <StyledRow>
                    <StyledCol>
                      <Form.Item label="Name" name="name" style={{ padding:"5px", display:"flex",color:"#bdc9d3",  marginRight:"30px"}}>
                        {/* <Input value={studentDataForm.student.user_id.name} readOnly /> */}
                        {studentDataForm.student.user_id.name}
                      </Form.Item>
                    </StyledCol>
                    <StyledCol>
                    <Form.Item label="Email" name="email" style={{ padding:"5px", color:"#bdc9d3", display:"flex", marginRight:"30px"}}>
                        {/* <Input value={studentDataForm.student.user_id.email} readOnly /> */}
                        {studentDataForm.student.user_id.email}
                      </Form.Item>
                    </StyledCol>
                    <StyledCol>
                    <Form.Item label="Phone" name="phone" style={{ padding:"5px",color:"#bdc9d3", display:"flex", marginRight:"30px"}}>
                        {/* <Input value={studentDataForm.student.phone_number} readOnly /> */}
                        {studentDataForm.student.phone_number}
                      </Form.Item>
                    </StyledCol>
                  </StyledRow>


                  {/* Row 3: Course, Standard, Board */}
                  <StyledRow>

                    <StyledCol>
                    <Form.Item label="Selected Gender" name="gender" style={{ padding:"5px", color:"#bdc9d3", display:"flex", marginRight:"30px"}}>
                        {/* <Input value={studentDataForm.student.type_of_batch} readOnly /> */}
                        {studentDataForm.student.gender}
                      </Form.Item>
                    </StyledCol>
                    <StyledCol>
                    <Form.Item label="Selected Board" name="board" style={{ padding:"5px", color:"#bdc9d3", display:"flex",marginRight:"30px"}}>
                        {/* <Input value={studentDataForm.student.board_id.name} readOnly /> */}

                        {studentDataForm.student.board_id?.name}
                      </Form.Item>
                    </StyledCol>
                    <StyledCol>
                    <Form.Item label="Selected Class" name="class" style={{ padding:"5px", color:"#bdc9d3", display:"flex", marginRight:"30px",}}>
                        {/* <Input value={studentDataForm.student.class.classLevel} readOnly /> */}
                        {studentDataForm.student.class.classLevel}
                      </Form.Item>
                    </StyledCol>
                  </StyledRow>
                    <StyledCol>
                      <Form.Item
                        label="Select Subjects (Minimum 3) "
                        name="subjects"
                        rules={[
                          {
                            required: true,
                            message: "Please select more 3 subjects",
                          },
                          () => ({
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
                            setSelectedSubject(options);
                            // setSelectedSubject(options);
                            console.log("Selected subjects:", options);
                          }}
                        />
                      </Form.Item>
                    </StyledCol>
                    <StyledCol>
                      <Form.Item

                      style={{paddingBottom:"20px"}}
                        label="Select Batch "
                        name="type_of_batch"
                        rules={[
                          {
                            required: true,
                            message: "Please select more 3 subjects",
                          },

                        ]}
                      >
                        <Select

                          placeholder="Select Batch Type..."
                          options={batchType.map((batch) => ({
                            value: batch._id,
                            label: batch.mode,
                          }))}
                          onChange={(options) => {
                            // setSelectedSubject(options);
                            // setSelectedSubject(options);
                            setSelectedBatch(options);
                            console.log("Selected subjects:", options);
                          }}
                        />

                      </Form.Item>
                    </StyledCol>
                  {/* </StyledRow> */}

                  {/* Submit Button */}
                  <StyledRow style={{ justifyContent: "flex-end" }}>
                    <StyledCol>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{
                            background:"purple",
                            display:"flex",
// marginTop:"20px",
                            flexDirection:"row",
                            justifyContent:"center",
                            margin:"auto",
                            borderColor: "#82194B",
                          }}
                        >
                          Submit Application
                        </Button>
                      </Form.Item>
                    </StyledCol>
                  </StyledRow>
                </Form>
                </div>
              </ApplicationDetails>
            </ApplicationContainer>
          ) : studentDataForm.student.custom_package_status === "pending" ? (
            <CustomPackageStatus>
              {" "}
              Your Custom Package is under review
            </CustomPackageStatus>
          ) : studentDataForm.student.custom_package_status == "rejected" && (
            <CustomPackageStatus>
              {" "}
              Your Custom Package Request Rejected
            </CustomPackageStatus>
          )
          }

       
        </>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};
