import React, { useState, useEffect } from "react";
// import { Card, Typography, Button, Row, Col, Modal, InputNumber,Select } from "antd";
import { Table, Input, Button, Space, Row, Col, Card, InputNumber, Select, Modal, Typography,  } from "antd";
import { Link } from "react-router-dom";
import { getBatchesByStudentId } from "../../../../api/batchApi";
import { getStudentByAuthId } from "../../../../api/studentApi";
import { getTeacherByAuthId } from "../../../../api/teacherApi";
import { getTypeOfBatchById } from "../../../../api/typeOfBatchApi";
import RenewButton from "../RenewButton/RenewButton";

const { Title, Text } = Typography;

const BatchDetailsContent = () => {
  const [batchDetails, setBatchDetails] = useState({});
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [studentdata, setStudentData] = useState({});
  const [subjectId, setSubjectId] = useState(null);
  const [batchId, setBatchId] = useState(null);

  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [enteredDuration, setEnteredDuration] = useState(1);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [gstRate] = useState(0.18); // 18% GST, for example
  const [basePrice] = useState(1000); // Example base price per month (customize as needed)

  // Show or hide modal
  const showModal = (data) => {
    setSubjectId(data.subjectId);
    setBatchId(data.batchId);
    setIsModalVisible(true);
  };
  const hideModal = () => setIsModalVisible(false);

  // Handle changes in duration
  const handleDurationChange = (value) => {
    //console.log("value", value);  
    setEnteredDuration(value);
  };

  // Recalculate price whenever duration changes
  useEffect(() => {
    const apiCaller = async () => {
      try {
        const authId = JSON.parse(localStorage.getItem("sessionData")).userId;
        const studentData = await getStudentByAuthId(authId);
        //console.log("studentData", studentData);
        const batchType = await getTypeOfBatchById(studentData.student.type_of_batch);
        //console.log("batchType", batchType);

        const price = batchType.price * enteredDuration; // Simple formula: basePrice * months
        setCalculatedPrice(price);
      } catch (error) {
        //console.error("Error fetching student data:", error);
      }
    }
    apiCaller();
    // const price = basePrice * enteredDuration; // Simple formula: basePrice * months
    // setCalculatedPrice(price);
  }, [enteredDuration, basePrice]);

  // Payment handle (placeholder)
  const handlePayNow = () => {
    // Example logic: you can redirect to a payment page, or call an API
    alert(`Redirecting to payment...\nDuration: ${enteredDuration}\nTotal Price: ${getTotalPrice()}`);
    hideModal();
  };

  // Helper to compute total price
  const getGstAmount = () => calculatedPrice * gstRate;
  const getTotalPrice = () => calculatedPrice + getGstAmount();

  // Fetch student ID on component mount
  useEffect(() => {
    const fetchStudentId = async () => {
      try {
        const sessionData = JSON.parse(localStorage.getItem("sessionData"));
        if (!sessionData || !sessionData.userId) {
          //console.error("User is not authenticated.");
          throw new Error("User is not authenticated.");
        }
        const authId = sessionData.userId;
        const studentData = await getStudentByAuthId(authId);
        setStudentData(studentData.student);
        if (!studentData.student || !studentData.student._id) {
          //console.error("Student data is incomplete.");
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
    if (studentId) {
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
  }, [studentId]);

  // Optional: Display error messages
  if (error) {
    return <div style={{ color: "red", margin: "20px" }}>Error: {error}</div>;
  }

  // Optional: Display loading state while fetching studentId or batches
  if (!studentId || batches.length === 0) {
    return (
      <Col span={24} style={{ textAlign: "center" , marginTop: "20px"}}>
        <Card style={{ width: "100%", backgroundColor: "#a0f2e3" }}>
          <h3>No Batches has been assigned to your Profile yet!</h3>
        </Card>
      </Col>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        //  justifyContent: "center",
        alignItems: "center",
        //  margin: "20px",
      }}
    >
      {batches.map((batch) => {
        // We'll do a quick check
        //console.log("batch", batch);
        const subjectInStudent = studentdata.subject_id.find(
          (subject) => subject?.batch_id == batch._id
        );
        // If subjectInStudent exists, let's check the status
        const statusText = subjectInStudent?.batch_status === "active" ? "Active" : "Inactive";
        const statusColor = subjectInStudent?.batch_status === "active" ? "#4CAF50" : "#FF2C2C";

        return (
          <Card
            key={batch._id}
            bordered={false}
            style={{
              width: 400,
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              margin: "20px",
              position: "relative",
            }}
          >
            {/* Status Tab */}
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: statusColor,
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
              <Col span={12} style={{ display: "flex", alignItems: "center" }
              }>
                <Text strong>Subject:</Text>
                <div style={{ marginLeft: 8 }}>{batch?.subject_id?.subject_name}</div>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginBottom: 20 }}>
              <Col span={24} style={{ display: "flex", alignItems: "center" }}>
                <Text strong>Teacher Assigned:</Text>
                <div style={{ marginLeft: 8 }}>
                  {batch.teacher_id && batch.teacher_id.length > 0
                    ? batch.teacher_id.map((teacher) => teacher.user_id.name).join(", ")
                    : "N/A"}
                </div>
              </Col>
            </Row>

            {/* Action Button */}
            {subjectInStudent?.batch_status === "active" ? (
              <Link to={`/student/dashboard/assignedBatches`}>
                <Button
                  type="primary"
                  block
                  style={{
                    backgroundColor: "#e91e63",
                    borderColor: "#e91e63",
                    color: "#fff",
                  }}
                >
                  View Full Details
                </Button>
              </Link>
            ) : (
              <Button
                type="primary"
                block
                style={{
                  backgroundColor: "#e91e63",
                  borderColor: "#e91e63",
                  color: "#fff",
                }}
                onClick={() => { showModal({ batchId: batch._id, subjectId: batch.subject_id._id }) }}
              >
                Subscribe to continue
              </Button>
            )}
          </Card>
        );
      })}

      {/* Subscription Modal */}
      <Modal
        title="Subscribe to Continue"
        visible={isModalVisible}
        onCancel={hideModal}
        footer={null} // We'll handle buttons inside the modal content
      >
        {/* <div style={{ marginBottom: 16 }}>
          <Text>Enter Duration (in months):</Text>
          <InputNumber
            min={1}
            style={{ marginLeft: 10, width: 120 }}
            value={enteredDuration}
            onChange={handleDurationChange}
          />
        </div> */}
        <div style={{ marginBottom: 16 }}>
          <Text>Enter Duration (in months):</Text>
          <Select
            placeholder="Select duration"
            style={{ marginLeft: 10, width: 120 }}
            value={enteredDuration}
            onChange={handleDurationChange}
          >
            <Option value={1}>1 Month</Option>
            <Option value={3}>3 Months</Option>
            <Option value={5}>5 Months</Option>
            <Option value={10}>10 Months</Option>
          </Select>
        </div>

        {/* Price Calculation */}
        <div style={{ marginBottom: 16 }}>
          <Text>Price: </Text>
          <Text strong>{calculatedPrice.toFixed(2)}</Text>
        </div>
        <div style={{ marginBottom: 16 }}>
          <Text>GST (18%): </Text>
          <Text strong>{(calculatedPrice * gstRate).toFixed(2)}</Text>
        </div>
        <div style={{ marginBottom: 16 }}>
          <Text>Total: </Text>
          <Text strong>{(calculatedPrice + calculatedPrice * gstRate).toFixed(2)}</Text>
        </div>
        <RenewButton studentId={studentId} amount={(calculatedPrice + calculatedPrice * gstRate)} batchId={batchId} subjectId={subjectId} duration={enteredDuration} />

        {/* <Button
          type="primary"
          block
          onClick={handlePayNow}
          style={{ backgroundColor: "#e91e63", borderColor: "#e91e63", color: "#fff" }}
        >
          Pay Now
        </Button> */}
      </Modal>
    </div>
  );
};

export default BatchDetailsContent;
