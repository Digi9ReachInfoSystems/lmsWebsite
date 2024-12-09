import React from "react";
import { List, Button } from "antd";
import { RightOutlined } from "@ant-design/icons";

const UpcomingMeetings = () => {
  // Sample data for the meetings
  const data = [
    { title: "Math Class", time: "10:00 AM - 11:00 AM" },
    { title: "Science Class", time: "11:30 AM - 12:30 PM" },
    { title: "History Class", time: "01:00 PM - 02:00 PM" },
    { title: "English Class", time: "02:30 PM - 03:30 PM" },
    { title: "Geography Class", time: "04:00 PM - 05:00 PM" },
    { title: "History Class", time: "01:00 PM - 02:00 PM" },
    { title: "English Class", time: "02:30 PM - 03:30 PM" },
    { title: "Geography Class", time: "04:00 PM - 05:00 PM" },
    { title: "English Class", time: "02:30 PM - 03:30 PM" },
    { title: "Geography Class", time: "04:00 PM - 05:00 PM" },
    { title: "Geography Class", time: "04:00 PM - 05:00 PM" },
  ];

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        // maxWidth: "600px",
        margin: "auto",
      }}
    >
      <h3>Upcoming Meetings</h3>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                icon={<RightOutlined />}
                style={{
                  backgroundColor: "#ff4d94", // Pink color
                  borderColor: "#ff4d94",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Join
              </Button>,
            ]}
          >
            <List.Item.Meta title={item.title} description={item.time} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default UpcomingMeetings;
