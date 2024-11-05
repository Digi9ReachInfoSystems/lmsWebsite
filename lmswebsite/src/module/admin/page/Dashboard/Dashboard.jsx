import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import './Dashboard.css'; // Import the CSS styles
import batch_icon from '../../assets/total_batches_icon.png';
import student_icon from '../../assets/total_students_icon.png';
import teacher_icon from '../../assets/total_teachers_icon.png';
import UserEngagementChart from '../../components/UserEngagementChart/UserEngagementChart';
import { getStatisticsData } from '../../../../api/statsApi';
import ContactForms from '../../components/ContactForm/ContactForm';
import UpcomingBatch from '../../components/UpcommingBatch/UpcominngBatch';

const Dashboard = () => {
  const [dashboardCards, setDashboardCards] = useState([]);

  useEffect(() => {
    const apiCaller = async () => {
      const response = await getStatisticsData();
      setDashboardCards([
        {
          title: 'Total no of students',
          count: response.totalStudents,
          iconPath: student_icon,
          background: '#F8E7D8',
        },
        {
          title: 'Total no of teachers',
          count: response.totalTeachers,
          iconPath: teacher_icon,
          background: '#D7FDEB',
        },
        {
          title: 'Total no of Batches',
          count: response.totalBatches,
          iconPath: batch_icon,
          background: '#C9E2FF',
        },
      ]);
      console.log(response);
    };
    apiCaller();
  }, []);

  return (
    <Grid container spacing={2} className="dashboard-container">
      <Grid className="dashboard-chart-row1">
        {dashboardCards.map((card, index) => (
          // <Grid item key={index} >
            <Card key={index} className="dashboard-card">
              <CardContent className="card-content">
                <Box className="card-icon" style={{ background: card.background }}>
                  <img src={card.iconPath} alt={`${card.title} Icon`} className="icon-image" />
                </Box>
                <Box className="card-info">
                  <Typography className="card-title">{card.title}</Typography>
                  <Typography className="card-count">{card.count}</Typography>
                </Box>
              </CardContent>
            </Card>
          // </Grid>
        ))}
      </Grid>

      <Grid className="dashboard-chart-row2">
        <UserEngagementChart />
        <ContactForms />
      </Grid>

      <Grid className='dashboard-chart-row3'>
        <UpcomingBatch />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
