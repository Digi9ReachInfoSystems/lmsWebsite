import React from "react";
import { Card, Typography, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const BatchDetailsContent = () => {
  // Sample batch details
  const batchDetails = {
    batchName: "BatchName",
    expiryDate: "2024-12-31",
    teacherAssigned: "John Doe",
  };

  return (
    <Card
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
          backgroundColor: "#4CAF50", // Green color for active status
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        Active
      </div>

      {/* Batch Name */}
      <Title level={4} style={{ marginBottom: 12 }}>
        {batchDetails.batchName}
      </Title>

      {/* Batch Info */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={12}>
          <Text strong>Expiry Date:</Text>
          <div>{batchDetails.expiryDate}</div>
        </Col>
      </Row>

      <Col span={12} style={{ marginBottom: 20 }}>
        <Text strong>Teacher Assigned:</Text>
        <div>{batchDetails.teacherAssigned}</div>
      </Col>

      {/* Action Button */}
      <Link to="/batch-details">
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
};

export default BatchDetailsContent;
