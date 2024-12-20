import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  SettingOutlined,
  UserOutlined,
  CreditCardOutlined,
  BellOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import StudentGeneralSettings from "../StudentGeneralSetting/StudentGeneralSetting";
import StudentAccountSettings from "../StudentAccountSetting/StudentAccountSetting";
import StudentPaymentSettings from "../StudentPaymentSetting/StudentPaymentSetting";
import StudentTermsConditionSettings from "../StudentsTerms&Conditions/StudentTerms&Condition";
import { StyledMenuItem } from "../StudentSetting/StudentSetting.style";
import { BodyText, Heading, PageContainer, Subheading } from "../../../../../style/PrimaryStyles/PrimaryStyles";
import Animation from "../../../../student/assets/Animation.json";
import Lottie from "lottie-react";
import { set } from "lodash";
const { Sider, Content } = Layout;

const StudentSetting = () => {
  const [collapsed, setCollapsed] = useState(false); // Sidebar collapse state
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  
  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return <StudentGeneralSettings />;
      case "account":
        return <StudentAccountSettings />;
      case "billing":
        return <StudentPaymentSettings />;
      case "terms":
        return <StudentTermsConditionSettings />;
     
      default:
        return <StudentGeneralSettings />;
    }
  };

  const handleMenuClick = (e) => {
    setActiveTab(e.key); // Set active tab based on menu item key

  };

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
            // Scale down the animation using transform
            transform: "scale(0.5)", 
            transformOrigin: "center center",
          }}
        >
          <Lottie
            animationData={Animation}
            loop={true}
          />
        </div>
      </div>
    );
  }
  return (
    <PageContainer>
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
      >
 <div className="settings-sider "
          style={{
            height: 32,
            margin: 16,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Settings
        </div>

        <Menu
          mode="inline"
          selectedKeys={[activeTab]}
          onClick={handleMenuClick}
        >
          <StyledMenuItem key="general" icon={<SettingOutlined />}>
           <BodyText>General</BodyText>
          </StyledMenuItem>
          <StyledMenuItem key="account" icon={<UserOutlined />}>
          <BodyText>Account</BodyText>
          </StyledMenuItem>
          <StyledMenuItem key="billing" icon={<CreditCardOutlined />}>
          <BodyText>Payment & Billing</BodyText>
          </StyledMenuItem>
          
          <StyledMenuItem key="terms" icon={<FileTextOutlined />}>
          <BodyText> Terms&Condition</BodyText>
          </StyledMenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Content
          style={{
            // margin: "24px 16px",
            padding: 24,
            background: "#fff",
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
    </PageContainer>
  );
};

export default StudentSetting;
