import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { DashboardScreenWrap } from "./Dashboard.styles";
import batch_icon from "../../assets/total_batches_icon.png";
import student_icon from "../../assets/total_students_icon.png";
import teacher_icon from "../../assets/total_teachers_icon.png";
import UserEngagementChart from "../../components/UserEngagementChart/UserEngagementChart";
import ContactForms from "../../components/ContactForm/ContactForm";
import UpcomingBatch from "../../components/UpcommingBatch/UpcominngBatch";
import Cards from "../../components/dashBoardCards/cards"; // Import the new Cards component
import { getStatisticsData } from "../../../../api/statsApi";

const Dashboard = () => {
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
    <DashboardScreenWrap className="content-area">
      <div className="area-row ar-one">
        <Cards cardsData={dashboardCards} />
      </div>
      <div className="area-row ar-two">
        <UserEngagementChart /> <ContactForms />
      </div>
      <div className="area-row ar-three">{/* <UpcomingBatch /> */}</div>
    </DashboardScreenWrap>
  );
};

export default Dashboard;
