import React from "react";
import { Card, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons"; // Optional: To use an icon
import MyLogo from "../../../../assets/pdf.svg"; // Adjust the path to your SVG file

const { Title } = Typography;

const MaterialFile = () => {
  const packageName = "Explore Material";

  return (
    <Card
      bordered={false}
      style={{
        width: 300,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center", // Center aligns all elements inside the card
      }}
    >
      {/* Header Section with Icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <CheckCircleOutlined
          style={{ fontSize: 24, color: "#524432", marginRight: 8 }}
        />
        <Title level={5} style={{ margin: 0 }}>
          {packageName}
        </Title>
      </div>

      {/* SVG Logo */}
      <div>
        <img
          src={MyLogo}
          alt="Material Logo"
          style={{
            width: "80px",
            height: "60px",
            marginTop: "8px",
          }}
        />
      </div>
    </Card>
  );
};

export default MaterialFile;
