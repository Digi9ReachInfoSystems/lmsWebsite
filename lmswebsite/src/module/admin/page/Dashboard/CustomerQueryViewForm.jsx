import React, { useState } from "react";
import "./CustomerQueryViewForm.css";

const QueryForm = () => {
  // Simulating fetched data from an API
  const [query, setQuery] = useState({
    _id: "67176c74669cc88b14c07faa",
    title: "Issue with product delivery",
    contactEmail: "customer@example.com",
    contactNumber: "1234567890",
    message: "I have not received my product yet.",
    querySolved: true,
    queryStatus: "solved",
    dateQueried: "2024-10-22T09:12:20.762Z",
  });

  const [status, setStatus] = useState(query.queryStatus);

  // Function to toggle query status
  const toggleStatus = () => {
    const newStatus = status === "solved" ? "pending" : "solved";
    setStatus(newStatus);
    setQuery((prevQuery) => ({
      ...prevQuery,
      queryStatus: newStatus,
      querySolved: newStatus === "solved",
    }));
  };

  return (
    <div className="queryForm-container">
      <h2 className="queryForm-title">Query Details</h2>
      <div className="queryForm-field">
        <label>Title:</label>
        <p>{query.title}</p>
      </div>
      <div className="queryForm-field">
        <label>Contact Email:</label>
        <p>{query.contactEmail}</p>
      </div>
      <div className="queryForm-field">
        <label>Contact Number:</label>
        <p>{query.contactNumber}</p>
      </div>
      <div className="queryForm-field">
        <label>Message:</label>
        <p>{query.message}</p>
      </div>
      <div className="queryForm-field">
        <label>Date Queried:</label>
        <p>{new Date(query.dateQueried).toLocaleString()}</p>
      </div>
      <div className="queryForm-field">
        <label>Status:</label>
        <button
          className={`queryForm-status-btn ${status}`}
          onClick={toggleStatus}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      </div>
    </div>
  );
};

export default QueryForm;
