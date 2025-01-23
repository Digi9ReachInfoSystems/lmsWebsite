import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import {
  StudentDashboardScreenWrap,
  WelcomeTitle,
  WelcomeMessage,
} from "./StudentDashboardScreen.styles";
import batch_icon from "../../assets/total_batches_icon.png";
import student_icon from "../../assets/total_students_icon.png";
import teacher_icon from "../../assets/total_teachers_icon.png";
import TeacherdashBoardCards from "../../../teacher/components/TeacherdashBoardCards/TeacherdashBoardCards";
import { getStatisticsData } from "../../../../api/statsApi";
import DailyScheduleStudent from "../../components/DailyScheduleStudent/DailyScheduleStudent";
import {
  Heading,
  Subheading,
  SpecialHeading,
  SpecialSubheading,
} from "../../../../style/PrimaryStyles/PrimaryStyles";
import welcomeImage from "../../../../assets/studentdashboard.png";
import UpcomingMeetings from "../../components/upcomingmeetings/upcomingmeetings"; // Assuming this component exists
import QuizScore from "../../components/quizscore/quizscore";
import Materials from "../../components/MaterialComponent/material";
import ActiveScore from "../../components/MaterialComponent/material";
import ActivePackage from "../../components/MaterialComponent/material";
import ExploreContent from "../../components/DownloadContent/BatchDetails";
import MaterialFile from "../../components/MaterialUploaded/materialFile";
import BatchDetailsContent from "../../components/DownloadContent/BatchDetails";
import Animation from "../../../student/assets/Animation.json";
import Lottie from "lottie-react";
import { getStudentBatchStatus, getStudentByAuthId } from "../../../../api/studentApi";
import { Modal } from "antd"; // Import Ant Design Modal
import { getBatchesByStudentId } from "../../../../api/batchApi";
import api from "../../../../config/axiosConfig";
// import "antd/dist/antd.css"; // Ensure Ant Design styles are applied

const StudentDashboardScreen = () => {
  const [dashboardCards, setDashboardCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState(""); // New state for student's name
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [expiredBatch, setExpiredBatch] = useState(""); // State to store the batch name

  useEffect(() => {
    const apiCaller = async () => {
      try {
        const sessionData = JSON.parse(localStorage.getItem("sessionData"));
        if (!sessionData || !sessionData.userId) {
          throw new Error("User is not authenticated.");
        }

        const authId = sessionData.userId;
        const studentData = await getStudentByAuthId(authId);
        ////console.log("Student Data:", studentData);

        if (!studentData.student || !studentData.student._id) {
          throw new Error("Student data is incomplete.");
        }

        // Set the student's name from the fetched data
        setStudentName(studentData?.student?.user_id?.name); // Adjust the path if necessary

        const response = await getStatisticsData();
        setDashboardCards([
          {
            title: "Total students",
            count: response.totalStudents,
            iconPath: student_icon,
            background: "#F8E7D8",
          },
          {
            title: "Total teachers",
            count: response.totalTeachers,
            iconPath: teacher_icon,
            background: "#D7FDEB",
          },
          {
            title: "Total Batches",
            count: response.totalBatches,
            iconPath: batch_icon,
            background: "#C9E2FF",
          },
        ]);
        setLoading(false);
      } catch (error) {
        ////console.error(error);
        // Handle error appropriately, e.g., set an error state
      }
    };
    apiCaller();
  }, []);
  useEffect(() => {
    const apiCaller = async () => {
      try {
        const sessionData = JSON.parse(localStorage.getItem("sessionData"));
        if (!sessionData || !sessionData.userId) {
          throw new Error("User is not authenticated.");
        }
  
        const authId = sessionData.userId;
        const studentData = await getStudentByAuthId(authId);
        //console.log("Student Data:", studentData);
  
        if (!studentData.student || !studentData.student._id) {
          throw new Error("Student data is incomplete.");
        }
  
        const fetchedBatches = await getBatchesByStudentId(
          studentData.student._id
        );
        const updatedBatches = await Promise.all(
          fetchedBatches.map(async (batch) => {
            const statusValue = await getStudentBatchStatus(studentData.student._id, batch._id); // Fetch the status
            return {
              ...batch,
              status: statusValue.status, // Add statusValue to batch data
            };
          })
        );
  
        for (const batch of updatedBatches) {
          if (!batch.status) {
            await new Promise((resolve) => {
              setExpiredBatch(batch.batch_name);
              setModalVisible(true);
  
              // Wait for the modal to close before resolving
              const interval = setInterval(() => {
                if (!modalVisible) {
                  clearInterval(interval);
                  resolve();
                }
              }, 10000);
            });
          }
        }
        navigate("/student/dashboard");create
      } catch (error) {
        //console.error("Error fetching batches:", error);
      }
    };
  
    apiCaller();
  }, []); // Ensure modalVisible state triggers re-execution when the modal closes.
  
  const handleModalClose = () => {
    setModalVisible(false);
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
          <Lottie animationData={Animation} loop={true} />
        </div>
      </div>
    );
  }

  return (
    <StudentDashboardScreenWrap className="content-area">
      {/* Modal for subscription expiry */}
      <Modal
        title="Subscription Expired"
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose} style={{ background: "#EE1B7A", color: "#fff" }}>
            Close
          </Button>,
        ]}
      >
        <div style={{ padding: "20px", lineHeight: "1.6", fontSize: "1rem", color: "#4A4A4A" }}>
          <p style={{ marginBottom: "10px" }}>
            Your subscription for the batch <strong style={{ color: "#007BFF" }}>{expiredBatch}</strong> has expired.
          </p>
          <p style={{ marginBottom: "10px" }}>
            To continue learning in this batch, please subscribe again.
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Need help?</strong> Contact our support team for further assistance.
          </p>
        </div>
      </Modal>
      <Grid container spacing={3}>
        {/* Left side containing the Welcome Container and Daily Schedule */}
        <Grid item xs={12} md={8}>
          <div className="welcome-Container">
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item xs={12} md={6}>
                {/* Updated welcome message with student's name */}
                <SpecialHeading>Welcome, {studentName}!</SpecialHeading>
                <SpecialSubheading>
                  Keep up the great work and let's achieve even more together.
                </SpecialSubheading>
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  className="Image"
                  src={welcomeImage}
                  alt="Welcome"
                  style={{ width: "100%", maxWidth: "150px" }}
                />
              </Grid>
            </Grid>
          </div>

          {/* Daily Schedule */}
          <div className="daily-schedule-container">
            <Grid
              container
              spacing={1}
              alignItems="center"
              justifyContent="flex-start"
            >
              {/* Active Package */}
              <Grid item>
                <div style={{ display: "inline-block", marginRight: "8px" }}>
                  <ActivePackage />
                </div>
              </Grid>

              {/* Quiz Score */}
              <Grid item>
                <div style={{ display: "inline-block" }}>
                  <QuizScore />
                </div>
              </Grid>
              <Grid item>
                <div style={{ display: "inline-block" }}>
                  <MaterialFile />
                </div>
              </Grid>
            </Grid>

            <BatchDetailsContent />
          </div>
        </Grid>

        {/* Right side containing the Upcoming Meetings */}
        <Grid item xs={12} md={4}>
          <div className="upcoming-meetings-container">
            <UpcomingMeetings /> {/* Assuming this is the correct component */}
          </div>
        </Grid>
      </Grid>
    </StudentDashboardScreenWrap>
  );
};

export default StudentDashboardScreen;
