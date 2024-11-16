import React, { useState } from "react";
import {
  Container,
  ToggleContainer,
  ToggleLabel,
  ToggleSwitch,
  ToggleInput,
} from "./PushNotificationSettings.style";

const PushNotificationSettings = () => {
  const [settings, setSettings] = useState({
    systemNotification: true,
    weeklyStatistics: false,
    emailNotification: false,
  });

  const handleToggle = (setting) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting], // Toggle the current setting state
    }));
  };

  return (
    <Container>
      <h2>Push Notification Settings</h2>
      <ToggleContainer>
        <ToggleLabel>System Notification</ToggleLabel>
        <ToggleSwitch
          active={settings.systemNotification}
          onClick={() => handleToggle("systemNotification")}
        >
          <ToggleInput
            type="checkbox"
            checked={settings.systemNotification}
            onChange={() => handleToggle("systemNotification")}
          />
          <span />
        </ToggleSwitch>
      </ToggleContainer>
      <ToggleContainer>
        <ToggleLabel>Weekly Statistics</ToggleLabel>
        <ToggleSwitch
          active={settings.weeklyStatistics}
          onClick={() => handleToggle("weeklyStatistics")}
        >
          <ToggleInput
            type="checkbox"
            checked={settings.weeklyStatistics}
            onChange={() => handleToggle("weeklyStatistics")}
          />
          <span />
        </ToggleSwitch>
      </ToggleContainer>
      <ToggleContainer>
        <ToggleLabel>Email Notification</ToggleLabel>
        <ToggleSwitch
          active={settings.emailNotification}
          onClick={() => handleToggle("emailNotification")}
        >
          <ToggleInput
            type="checkbox"
            checked={settings.emailNotification}
            onChange={() => handleToggle("emailNotification")}
          />
          <span />
        </ToggleSwitch>
      </ToggleContainer>
    </Container>
  );
};

export default PushNotificationSettings;
