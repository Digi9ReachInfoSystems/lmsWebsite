import React from "react";
import { Card, Progress, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons"; // Optional: To use an icon

const { Title, Text } = Typography;

const ActivePackage = () => {
  // Example data for the package
  const packageName = "Premium Package";
  const progressPercentage = 75; // example progress value

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

      {/* Text Info */}
      <Text type="secondary">Attendance: {progressPercentage}%</Text>
    </Card>
  );
};

export default ActivePackage;
