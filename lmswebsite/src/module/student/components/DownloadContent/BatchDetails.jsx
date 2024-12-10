import React, { useState, useEffect } from "react";
import { Card, Typography, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { getBatchesByStudentId } from "../../../../api/batchApi";
const { Title, Text } = Typography;
import { getStudentByAuthId } from "../../../../api/studentApi";
import { getTeacherByAuthId } from "../../../../api/teacherApi";

const BatchDetailsContent = () => {
  const [batchDetails, setBatchDetails] = useState({});
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [teacherId, setTeacherId] = useState(null);

  // Fetch student ID on component mount
  useEffect(() => {
    const fetchStudentId = async () => {
      try {
        const sessionData = JSON.parse(localStorage.getItem("sessionData"));
        if (!sessionData || !sessionData.userId) {
          console.error("User is not authenticated.");
          throw new Error("User is not authenticated.");
        }
        const authId = sessionData.userId;
        const studentData = await getStudentByAuthId(authId);
        if (!studentData.student || !studentData.student._id) {
          console.error("Student data is incomplete.");
          throw new Error("Student data is incomplete.");
        }
        setStudentId(studentData.student._id);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudentId();
  }, []);

  // Fetch batches whenever studentId changes
  useEffect(() => {
    if (studentId) { // Ensure studentId is available
      const fetchBatches = async () => {
        try {
          const response = await getBatchesByStudentId(studentId);
          setBatches(response);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchBatches();
    }
  }, [studentId]); // Dependency array includes studentId

  // Optional: Display error messages
  if (error) {
    return <div style={{ color: 'red', margin: '20px' }}>Error: {error}</div>;
  }

  // Optional: Display loading state while fetching studentId or batches
  if (!studentId || batches.length === 0) {
    return <div style={{ margin: '20px' }}>Loading...</div>;
  }

  return (
    <div>
      {batches.map((batch) => {
        // Determine if the batch is active based on the current date and expiry date
        const currentDate = new Date();
        const expiryDate = new Date(batch.date);
        const isActive = currentDate < expiryDate;

        // Define status text and color based on isActive
        const statusText = isActive ? "Active" : "Active";
        const statusColor = isActive ? "#4CAF50" : "#4CAF50"; // Green for Active, Red for Inactive

        return (
          <Card
            key={batch._id} // Always add a unique key when mapping
            bordered={false}
            style={{
              width: 400,
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              margin: "20px",
              position: "relative", // For absolute positioning of status tab
            }}
          >
            {/* Status Tab */}
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: statusColor, // Dynamic color based on status
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {statusText}
            </div>

            {/* Batch Name */}
            <Title level={4} style={{ marginBottom: 12 }}>
              {batch.batch_name}
            </Title>

            {/* Batch Info */}
            <Row gutter={16} style={{ marginBottom: 20 }}>
              <Col span={12} style={{ display: "flex", alignItems: "center" }}>
                <Text strong>Subject:</Text>
                <div style={{ marginLeft: 8 }}>{batch.subject_id.subject_name}</div>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginBottom: 20 }}>
              <Col span={24} style={{ display: "flex", alignItems: "center" }}>
                <Text strong>Teacher Assigned:</Text>
                <div style={{ marginLeft: 8 }}>
                  {batch.teacher_id && batch.teacher_id.length > 0
                    ? batch.teacher_id
                        .map((teacher) => teacher.user_id.name)
                        .join(", ")
                    : "N/A"}
                </div>
              </Col>
            </Row>

            {/* Action Button */}
            <Link to={`/student/dashboard/assignedBatches`}>
              <Button
                type="primary"
                block
                style={{
                  backgroundColor: "#e91e63", // Pink color
                  borderColor: "#e91e63",
                  color: "#fff",
                }}
              >
                View Full Details
              </Button>
            </Link>
          </Card>
        );
      })}
    </div>
  );
};

export default BatchDetailsContent;
