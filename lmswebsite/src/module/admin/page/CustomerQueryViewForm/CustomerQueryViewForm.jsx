import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import "./CustomerQueryViewForm.css";
import { fetchQueryById, updateQueryById } from "../../../../api/customerQueryApi";

const CustomerQueryViewForm = () => {
  const { queryId } = useParams(); // Get the queryId from the route params
  const [query, setQuery] = useState(null); // Store query details
  const [status, setStatus] = useState(""); // Store the status of the query
  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(""); // Store error messages

  // Fetch query details when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQueryById(queryId); // Fetch the query by ID
        console.log(data);
        setQuery(data); // Set the query details
        setStatus(data.queryStatus); // Set the initial status
      } catch (err) {
        console.error("Error fetching query:", err.message);
        setError("Failed to fetch query details.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, [queryId]);

  // Function to toggle the query status and update it on the backend
  const toggleStatus = async () => {
    try {
      const newStatus = status === "solved" ? "pending" : "solved"; // Toggle status

      const updatedQuery = {
        ...query,
        queryStatus: newStatus,
        querySolved: newStatus === "solved",
      };

      // Update the query status on the backend
      await updateQueryById(queryId, updatedQuery);

      // Update the state locally after successful backend update
      setQuery(updatedQuery);
      setStatus(newStatus);

      alert("Query status updated successfully.");
      Navigate("/admin/customerQueryReview");
    } catch (error) {
      console.error("Error updating query status:", error.message);
      alert("Failed to update query status.");
    }
  };

  if (loading) return <p>Loading query details...</p>;
  if (error) return <p className="error_message">{error}</p>;

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

export default CustomerQueryViewForm;
