import React, { useEffect, useState } from "react";
import { Card, Progress, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons"; // Optional: To use an icon

const { Title, Text } = Typography;
import {
  getStudentAttendance,
  getStudentByAuthId,
  getStudentscheduleById,
} from "../../../../api/studentApi";

const ActivePackage = () => {
  // Example data for the package
  const packageName = "Attendance";
  const [progressPercentage, setProgressPercentage] = useState(0); // Initialize to 0

  const [studentId, setStudentId] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [classesAttended, setClassesAttended] = useState(0); // New state for classes attended
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentId = async () => {
      //console.log("Fetching student ID...");
      try {
        const sessionData = JSON.parse(localStorage.getItem("sessionData"));
        if (!sessionData || !sessionData.userId) {
          //console.error("User is not authenticated.");
          throw new Error("User is not authenticated.");
        }
        const authId = sessionData.userId;
        const studentData = await getStudentByAuthId(authId);
        if (!studentData.student || !studentData.student._id) {
          //console.error("Student data is incomplete.");
          throw new Error("Student data is incomplete.");
        }
        setStudentId(studentData.student._id);
      } catch (error) {
        setError(error.message);
        setLoading(false); // Stop loading on error
      }
    };

    fetchStudentId();
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {

      //console.log("Fetching attendance for student ID:", studentId);
      try {
        if (studentId) {
          const attendanceData = await getStudentAttendance(studentId);
          //console.log("Received attendance data:", attendanceData);

          setAttendance(attendanceData);

          // Set the classesAttended from the response
          if (attendanceData.classesAttended !== undefined && attendanceData.classesAttended !== null) {
           //console.log("classesAttended", attendanceData.classesAttended);
            setClassesAttended(attendanceData.classesAttended);
            //console.log("Classes attended:", attendanceData.classesAttended);
          }

          // Optionally, calculate progress percentage based on attended classes
          // For example, assuming total classes are the length of attendance array
          const totalClasses = attendanceData.attendance.length;
          const percentage = totalClasses > 0
            ? Math.round((attendanceData.classesAttended / totalClasses) * 100)
            : 0;
          setProgressPercentage(percentage);

          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [studentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <Card
      bordered={false}
      style={{
        width: 300,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header Section with Icon */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <CheckCircleOutlined
          style={{ fontSize: 24, color: "#52c41a", marginRight: 8 }}
        />
        <Title level={5} style={{ margin: 0 }}>
          {packageName}
        </Title>
      </div>

      <Progress
        percent={progressPercentage}
        status="active"
        strokeColor="#52c41a"
        style={{ marginBottom: 16 }}
      />

      {/* Display the number of classes attended */}
      
      {/* Optionally, display total classes and percentage */}
      {attendance && (
        <div style={{ marginTop: 8 }}>
          <Text type="secondary">Classes Attended: {classesAttended}</Text>
          <br />
          <Text type="secondary">
            Total Classes: {attendance.attendance.length}
          </Text>
          <br />
          {/* <Text type="secondary">
            Attendance Percentage: {progressPercentage}%
          </Text> */}
        </div>
      )}
    </Card>
  );
};

export default ActivePackage;
