import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Default styles for react-big-calendar
import "./ManageMeeting.css"; // Optional custom styles

const localizer = momentLocalizer(moment);

function ManageMeeting() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch teacher schedule from API
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const teacherId = "6482b54ef5823f6b2e3db456"; // Replace with dynamic teacher ID
        const response = await axios.get(
          `https://lmswebsite-backend.vercel.app/teachers/teacher/67456cc8d15050c25347206f/schedule`
        );
        const schedule = response.data.schedule;

        // Map the schedule into events for react-big-calendar
        const formattedEvents = schedule.map((item, index) => ({
          id: index,
          title: item.meeting_title || "No Title", // Use the meeting title from the API response
          start: new Date(item.date),
          end: new Date(new Date(item.date).getTime() + 60 * 60 * 1000), // Assume 1-hour meetings
          meeting_url: item.meeting_url || null, // Include meeting URL
        }));

        setEvents(formattedEvents);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch schedule");
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  // Handle when a user clicks on an event
  const handleSelectEvent = (event) => {
    if (event.meeting_url) {
      window.open(event.meeting_url, "_blank"); // Open the meeting URL in a new tab
    } else {
      alert("Meeting link is not available.");
    }
  };

  // Custom event rendering with time
  const renderEvent = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
      <br />
      <span style={{ fontSize: "12px", color: "#ffffff" }}>
        {moment(event.start).format("hh:mm A")} -{" "}
        {moment(event.end).format("hh:mm A")}
      </span>
      <br />
      {event.meeting_url ? (
        <button
          style={{
            marginTop: "5px",
            backgroundColor: "#f78fb3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleSelectEvent(event);
          }}
        >
          Join Meeting
        </button>
      ) : (
        <span style={{ color: "red", fontSize: "12px" }}>
          Meeting URL not available
        </span>
      )}
    </div>
  );

  return (
    <div style={{ padding: "20px", backgroundColor: "#ffffff" }}>
      <h1 style={{ color: "#8e44ad" }}>Manage Meetings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 800, borderRadius: "10px" }}
          views={["month", "week", "day", "agenda"]}
          defaultView="month"
          selectable={true}
          components={{
            event: renderEvent,
          }}
          popup={true}
          eventPropGetter={() => (event) => ({
            style: {
              backgroundColor: event.meeting_url ? "#f4c6d8" : "#f8d7da",
              color: "black",
            },
          })}
        />
      )}
    </div>
  );
}

export default ManageMeeting;
