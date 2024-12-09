import React from "react";
import { Card, Progress, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons"; // Optional: To use an icon

const { Title, Text } = Typography;

const QuizScore = () => {
  // Example data for the package
  const packageName = "Pending Quiz";
  const progressPercentage = 45; // example progress value

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
          style={{ fontSize: 24, color: "#52c4", marginRight: 8 }}
        />
        <Title level={5} style={{ margin: 0 }}>
          {packageName}
        </Title>
      </div>

      <Progress
        percent={progressPercentage}
        status="active"
        strokeColor="#52c4"
        style={{ marginBottom: 16 }}
      />

      {/* Text Info */}
      <Text type="secondary">QUiz Completion Rate {progressPercentage}%</Text>
    </Card>
  );
};

export default QuizScore;
