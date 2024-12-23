import React, { useEffect ,useState} from "react";
import { List, Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { getStudentAttendance, getStudentByAuthId, getStudentscheduleById, getStudentscheduleForSevenDaysById, studentClockIn, studentClockOut } from "../../../../api/studentApi";
import { set } from "lodash";
import { clockIn, clockOut, getTeacherAttendance, getTeacherByAuthId, getTeacherscheduleForSevenDaysById } from "../../../../api/teacherApi";

const UpcomingMeetings = () => {
  const [meetingData, setMeetingData] = React.useState([]);
  const [studentMode, setStudentMode] = useState("normal");
  const [attendanceStatus, setAttendanceStatus] = useState({});

  useEffect(() => {
    const apiCaller = async () => {
      const autId = JSON.parse(localStorage.getItem("sessionData")).userId;
      const teacherdata = await getTeacherByAuthId(autId);
      // setStudentMode(studentData.student.mode);
      // //console.log("studentData", studentData.student._id);
      const response = await getTeacherscheduleForSevenDaysById(teacherdata.teacher._id);
      const studentAttendanceData = await getTeacherAttendance(teacherdata.teacher._id);
      const schedule = response.data.schedule;
      //console.log("schedule", schedule);
      // Map the schedule into events for react-big-calendar
      let formattedEvents = schedule.map((item, index) => ({
        id: index,
        title: item.meeting_title || "No Title", // Use the meeting title from the API response
        start: new Date(item.date),
        end: new Date(new Date(item.date).getTime() + 60 * 60 * 1000), // Assume 1-hour meetings
        meetingId: item.meeting_id, // Use meeting_id to track clocking
        meeting_url: item.meeting_url || null, // Include meeting URL
        meeting_reschedule: item.meeting_reschedule,
        clockIn: false,
        clockOut: false,
      }));
      studentAttendanceData.attendance.map((item) => {
        formattedEvents = formattedEvents.map((event) => {
          if (item.meeting_id === event.meetingId) {
            return {
              ...event,
              clockIn: item.clock_in_time ? true : false,
              clockOut: item.clock_out_time ? true : false,
            };
          } else {
            return event;
          }
        });
      });
      setMeetingData(formattedEvents);
    }
    apiCaller();
  }, [])
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
  //console.log("meetingData", meetingData);

  // Handle when a user clicks on an event
  const handleSelectEvent = (event) => {
  //console.log("event", event);
    if (event.meeting_url) {
      window.open(event.meeting_url, "_blank"); // Open the meeting URL in a new tab
      handleClockIn(event.meetingId);
    } else {
      alert("Meeting link is not available.");
    }
  };
  const handleClockIn = async (meetingId) => {
    try {
      const authId = JSON.parse(localStorage.getItem("sessionData")).userId;
      const teacherdata= await getTeacherByAuthId(authId);

      // Clock-in API requires teacherId and meetingId
      const response = await clockIn(teacherdata.teacher._id, meetingId); // Make sure you pass teacher._id

      setAttendanceStatus((prevStatus) => ({
        ...prevStatus,
        [meetingId]: "clocked-in", // Update the status to clocked-in
      }));
      if (response) {
        window.location.reload();
      }
    } catch (error) {
      //console.error("Error clocking in:", error);
    }
  };

  // Handle clock-out action
  const handleClockOut = async (item) => {
    //console.log("meetingId", item);
    try {
      const authId = JSON.parse(localStorage.getItem("sessionData")).userId;
      const teacherdata = await getTeacherByAuthId(authId);
      const response = await clockOut(
        teacherdata.teacher._id,
        item.meetingId
      ); // Pass teacherId and meetingId

      setAttendanceStatus((prevStatus) => ({
        ...prevStatus,
        [meetingId]: "clocked-out", // Update the status to clocked-out
      }));
      if (response) {
        window.location.reload(); 
      }
    } catch (error) {
      //console.error("Error clocking out:", error);
    }
  };
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
      {
      ( meetingData && meetingData.length > 0) &&
        <List
          itemLayout="horizontal"
          dataSource={meetingData}
          renderItem={(item) => {
            //console.log("item", item);
            return (
              <List.Item
                actions={[!item.clockIn ?
                  (<>
                    <Button
                      type="primary"
                      icon={<RightOutlined />}
                      style={{
                        backgroundColor: "#ff4d94", // Pink color
                        borderColor: "#ff4d94",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                      onClick={() => handleSelectEvent(item)}
                    >
                      Join
                    </Button>
                    {studentMode === "personal" &&
                      (<Button
                        type="primary"
                        icon={<RightOutlined />}
                        style={{
                          backgroundColor: "#ff4d94", // Pink color
                          borderColor: "#ff4d94",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                        onClick={() => handleSelectEvent(item)}
                      >
                        Reschedule
                      </Button>)
                    }
                  </>
                  ) : (item.clockIn && !item.clockOut ? <Button
                    type="primary"
                    icon={<RightOutlined />}
                    style={{
                      backgroundColor: "#ff4d94", // Pink color
                      borderColor: "#ff4d94",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleClockOut(item)}
                  >
                    Clock Out
                  </Button>:
                  <span>Clocked Out</span>)
                ]}
              >
                <List.Item.Meta title={item?.title} description={new Date(item?.start).toLocaleString()} />
              </List.Item>
            )
          }}
        />

      }
      {/* <List
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
      /> */}
    </div>
  );
};

export default UpcomingMeetings;
