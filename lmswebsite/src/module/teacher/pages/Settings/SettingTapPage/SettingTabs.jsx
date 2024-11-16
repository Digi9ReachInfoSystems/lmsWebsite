// src/SettingsPage/SettingsPage.jsx
import React, { useState } from "react";
import {
  Container,
  Sidebar,
  SidebarItem,
  SidebarIcon,
  Content,
  Title,
  HamburgerMenu,
} from "./SettingTabs.style";
import GeneralSettings from "../GeneralSettings/GeneralSettings";
import AccountSettings from "../AccountSettings/AccountSettings";
import PaymentSettings from "../PaymentSettings/PaymentSettings";
import TermsConditionSettings from "../TermsConditionSettings/TermsConditionSettings";

import PushNotificationSettings from "../PushNotificationSettings/PushNotificationSettings"; // Import PushNotificationSettings

const SidebarItems = [
  { name: "General", key: "general" },
  { name: "Account", key: "account" },
  { name: "Payment & Billing", key: "billing" },
  { name: "Push Notification", key: "notifications" },
  { name: "Terms & Condition", key: "terms" },
];

const SettingsTabs = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isSidebarVisible, setSidebarVisible] = useState(false); // State for toggling sidebar visibility


 
  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings />;
      case "account":
        return <AccountSettings />;
      case "billing":
        return <PaymentSettings />;
      case "terms":
        return <TermsConditionSettings />;
      case "notifications":
        return <PushNotificationSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  const handleHamburgerClick = () => {
    setSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility on hamburger click
  };

  return (
    <Container>
      <HamburgerMenu onClick={handleHamburgerClick}>
        <h3>Settings</h3>
        <div className="hamburger-lines">
          <div></div> {/* Hamburger line 1 */}
          <div></div> {/* Hamburger line 2 */}
          <div></div> {/* New child line */}
        </div>
      </HamburgerMenu>
      <Sidebar isSidebarVisible={isSidebarVisible}>
        {SidebarItems.map((item) => (
          <SidebarItem
            key={item.key}
            active={item.key === activeTab}
            onClick={() => setActiveTab(item.key)}
          >
            {/* <Title> */}
              {item.name}
            {/* </Title> */}
          </SidebarItem>
        ))}
      </Sidebar>
      <Content>{renderContent()}</Content>
    </Container>
  );
};

export default SettingsTabs;
