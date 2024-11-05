import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { PiFunnel } from "react-icons/pi";
import "./ApplicationFormReview.css";
import { getTeacherApplications } from "../../../../api/teachersApplicationApi"; // Correct import
import { Link } from "react-router-dom";

const ApplicationFormReview = () => {
  const [activeForm, setActiveForm] = useState("teacher");
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch pending teacher applications on component mount or when activeForm changes
  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getTeacherApplications("pending"); // Correct API call
        console.log("Fetched Applications:", data); // Debugging
        if (data && data.applications) {
          setApplications(data.applications);
          setFilteredApplications(data.applications); // Initialize filtered applications
        } else {
          setError("Unexpected response format.");
          console.error("Unexpected response format:", data);
        }
      } catch (err) {
        setError("Failed to fetch applications.");
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    if (activeForm === "teacher") {
      fetchApplications();
    }
  }, [activeForm]);

  // Handle form type switching (if you plan to add student forms in the future)
  const handleButtonClick = (formType) => {
    setActiveForm(formType);
  };

  // Filter applications based on search term
  useEffect(() => {
    const filtered = applications.filter((application) =>
      application.teacher_id.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredApplications(filtered);
  }, [searchTerm, applications]);

  return (
    <>
      {/* Navigation Bar */}
      <div className="apllicationFormReview-Container">
        <div className="batchesNav">
          <div className="batchForm">
            <h2 className="batchTitle">Application Form</h2>
          </div>
          <div className="batchBtn">
            <button
              className={`batchTeacher ${activeForm === "teacher" ? "active" : ""}`}
              onClick={() => handleButtonClick("teacher")}
            >
              <span> Teacher </span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="batchSearch">
          <FaSearch className="searchIcon" />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Type to search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <PiFunnel className="FunnelIcon" />
        </div>

        {/* Table Container */}
        <div className="table-container">
          {loading ? (
            <p>Loading applications...</p>
          ) : error ? (
            <p className="error_message">{error}</p>
          ) : filteredApplications.length === 0 ? (
            <p>No matching applications found.</p>
          ) : (
            <table>
              <thead>
                <tr className="thead">
                  <th className="tdata">Name</th>
                  <th className="tdata">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((application) => (
                  <tr key={application._id} className="tbody">
                    <td className="tdata">{application.teacher_id.name}</td>

                    <td className="tdata">
                      <Link to={`/admin/applicationFormReview/teacher/${application._id}`}>
                        {application.approval_status}
                      </Link>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ApplicationFormReview;
