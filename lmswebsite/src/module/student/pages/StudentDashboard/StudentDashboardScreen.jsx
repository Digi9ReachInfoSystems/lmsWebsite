import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
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

const StudentDashboardScreen = () => {
  const [dashboardCards, setDashboardCards] = useState([]);

  useEffect(() => {
    const apiCaller = async () => {
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
    };
    apiCaller();
  }, []);

  return (
    <StudentDashboardScreenWrap className="content-area">
      <Grid container spacing={3}>
        {/* Left side containing the Welcome Container and Daily Schedule */}
        <Grid item xs={12} md={8}>
          <div className="welcome-Container">
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={12} md={6}>
                <SpecialHeading>Welcome, Topper!</SpecialHeading>
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
