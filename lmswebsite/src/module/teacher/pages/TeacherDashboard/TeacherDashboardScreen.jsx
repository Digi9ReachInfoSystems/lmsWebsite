import React, { useState, useEffect } from "react";
import { TeacherDashBoardCardswrap } from "./TeacherDashboardScreen.styles";
import {
  getBatchesCount,
  getStudentsCount,
  getTotalWorkingHours,
} from "../../../../api/teachDashboardApi";
import {
  Heading,
  Subheading,
  SpecialHeading,
  SpecialSubheading,
} from "../../../../style/PrimaryStyles/PrimaryStyles";
import { getTeacherByAuthId } from "../../../../api/teacherApi";
import TeacherdashBoardCards from "../../components/TeacherdashBoardCards/TeacherdashBoardCards";
import { ImUser } from "react-icons/im";
import { MdLiveTv } from "react-icons/md";
import { getRecentQuizForTeacher } from "../../../../api/teachDashboardApi"; // Correct API import
import TeacherdashBoardQuizCard from "../../components/TeacherDashboardQuizCard/TeacherDashboardQuizCard";
import DailySchedule from "../../components/DailySchedule/DailySchedule";
import { Ri24HoursFill } from "react-icons/ri";
import { Grid } from "@mui/material";
import welcomeImage from "../../../../assets/image.png";
import Animation from "../../../teacher/assets/Animation.json";
import Lottie from "lottie-react";
import ToolbarTeacher from "../../components/ToolbarTeacher/ToolbarTeacher";
import DashboardBatches from "../../components/DashboardBatches/DashboardBatches";
import UpcomingMeetings from "../../components/upcomingmeetings/upcomingmeetings";
const iconMap = {
  "Total students": <ImUser />,
  "Total Batches": <MdLiveTv />,
  "Recent Quiz": <MdLiveTv />, // You can replace with a more relevant icon if you have one
  "Total Working Hours": <Ri24HoursFill />,
};

const TeacherDashBoardScreen = () => {
  const [batchesCount, setBatchesCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [teacherData, setTeacherData] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [dashboardCards, setDashboardCards] = useState([]);
  const [recentQuiz, setRecentQuiz] = useState(null); // State to store recent quiz data
  const [quizCardData, setQuizCardData] = useState(null); // State to store quiz card data
  const [loading, setLoading] = useState(false); // State for loading
  // Fetch teacher data and set teacherId
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        setLoading(true);
        const sessionData = JSON.parse(localStorage.getItem("sessionData"));
        if (!sessionData || !sessionData.userId) {
          throw new Error("User is not authenticated.");
        }

        const teacherData = await getTeacherByAuthId(sessionData.userId);
        setTeacherData(teacherData);
        setTeacherId(teacherData.teacher?._id); // Set teacherId
        ////console.log("Teacher Data:", teacherData);
      } catch (error) {
        //console.error("Error fetching teacher data:", error);
      }
    };

    fetchTeacherData();
    setLoading(false);
  }, []);

  // Fetch batch and student counts when teacherId is available
  useEffect(() => {
    if (!teacherId) return;

    const fetchCounts = async () => {
      setLoading(true);
      try {
        const batchCount = await getBatchesCount(teacherId);
        const studentCount = await getStudentsCount(teacherId);
        const totalWorkingHours = await getTotalWorkingHours(teacherId);

        setBatchesCount(batchCount.count || 0);
        setStudentsCount(studentCount.totalStudents || 0);

        // Set up dashboard cards data for batches and students
        setDashboardCards([
          {
            title: "Total students",
            icon: iconMap["Total students"],
            count: studentCount.totalStudents || 0,
          },
          {
            title: "Total Batches",
            icon: iconMap["Total Batches"],
            count: batchCount.count || 0,
          },
          {
            title: "Total Working Hours",
            icon: iconMap["Total Working Hours"],
            count: Math.trunc(totalWorkingHours.totalWorkingHours) || 0,
          },
        ]);
      } catch (error) {
        //console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
    setLoading(false);
  }, [teacherId]); // Trigger when teacherId changes

  // Fetch recent quiz for the teacher once teacherId is available
  useEffect(() => {
    if (!teacherId) return;

    const fetchRecentQuiz = async () => {
      try {
        setLoading(true);
        const recentQuizData = await getRecentQuizForTeacher(teacherId);
        setRecentQuiz(recentQuizData);
        //console.log("Recent Quiz fetched:", recentQuizData);

        // Set up quiz card data
        setQuizCardData({
          // title: 'Recent Quiz',
          icon: iconMap["Recent Quiz"],
          title: recentQuizData.quiz_title || "No recent quiz available", // If there's no recent quiz, show a fallback message
          batch_name: recentQuizData.batch_index?.batch_name || "N/A",
          subject_name: recentQuizData.subject?.subject_name || "N/A",
          className: recentQuizData.class_level?.className || "N/A",
          answeredBy: recentQuizData.answered_by.length || "0",
        });
      } catch (error) {
        //console.error("Error fetching recent quiz:", error);
      }
    };

    fetchRecentQuiz();
    setLoading(false);
  }, [teacherId]);

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
    <TeacherDashBoardCardswrap className="content-area">
      <div>
        {/* Pass the cards data to TeacherdashBoardCards component */}
        {/* <TeacherdashBoardCards cardsData={dashboardCards} /> */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <div className="welcome-Container">
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={12} md={6}>
                  <SpecialHeading>Welcome, Teacher!</SpecialHeading>
                  <SpecialSubheading>
                    Let's get the good work started.
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
            <div className="daily-schedule-container">
              <Grid
                container
                spacing={1}
                alignItems="center"
                justifyContent="flex-start"
              >
                <Grid item xs={12} md={8}>
                  <div className="area-row ar-three">
                    <ToolbarTeacher />
                  </div>
                </Grid>
                <Grid item xs={12} md={8}>
                  <div>
                    <DashboardBatches />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          {/* Right side containing the Upcoming Meetings */}
          <Grid item xs={12} md={4}>
            <div className="upcoming-meetings-container">
              <UpcomingMeetings />
              {/* Assuming this is the correct component */}
            </div>
          </Grid>
        </Grid>
      </div>
      {/* <div className="area-row ar-three">
        <ToolbarTeacher />
      </div> */}
      {/* <div>
        <DashboardBatches />
      </div> */}
      <div className="area-row ar-two">
        {/* <DailySchedule />{" "} */}
        {/* <TeacherdashBoardQuizCard cardsdata={quizCardData} /> */}
      </div>
      <div className="area-row ar-three">{/* Additional UI components */}</div>
    </TeacherDashBoardCardswrap>
  );
};

export default TeacherDashBoardScreen;
