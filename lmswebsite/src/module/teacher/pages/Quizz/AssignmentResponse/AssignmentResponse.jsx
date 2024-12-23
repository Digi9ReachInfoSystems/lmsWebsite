// src/components/AssignmentResponses.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Table, Button, message, Spin } from "antd";
import { getAssignmentById } from "../../../../../api/assignmentApi"; // Adjust the path as needed
import Lottie from "lottie-react";
import Animation from "../../../../teacher/assets/Animation.json"; // Adjust the path as needed
import { IoMdArrowRoundBack } from "react-icons/io";
const AssignmentResponses = () => {
  const { assignmentId } = useParams(); // Retrieve assignment ID from URL
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchAssignment = async () => {
      try {
        const response = await getAssignmentById(assignmentId);
        if (response.assignment) {
          setAssignment(response.assignment);
        } else {
          message.error("Assignment not found.");
          navigate(-1); // Navigate back if assignment not found
        }
      } catch (error) {
        //console.error("Error fetching assignment:", error);
        message.error("Failed to fetch assignment. Please try again.");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [assignmentId, navigate]);

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

  if (!assignment) {
    return null;
  }

  const responses = assignment.responses;

  const tableColumns = [
    {
      title: "Student Name",
      dataIndex: ["student_id", "user_id", "name"],
      key: "student_name",
    },
    {
      title: "Submitted File",
      dataIndex: "response_url",
      key: "response_url",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer"
        style={{ color: "#EE1B7A" }}>
          View File
        </a>
      ),
    },
    {
      title: "Submission Date",
      dataIndex: "submission_date",
      key: "submission_date",
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Link to={`/teacher/dashboard/quizz/assignedBatch/uploadContent`
        
      } >
      <IoMdArrowRoundBack />
      </Link>
      <h1 style={{ marginBottom: "20px", padding:"20px", fontSize:"24px" }}>Responses for Assignment: {assignment.batch_id.batch_name}</h1>
      <Table
        columns={tableColumns}
        dataSource={responses}
        rowKey={(record) => record.student_id._id} // Assuming each student has a unique _id
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default AssignmentResponses;
