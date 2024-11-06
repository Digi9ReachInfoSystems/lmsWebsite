import React, { useEffect, useState } from "react";
import { UpcomingBatchWrap } from "./UpcomingBatch.styles";
import { getAllBatches } from "../../../../api/batchApi"; // Import the API function
import { Link } from "react-router-dom";

const UpcomingBatch = () => {
  const [batchData, setBatchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch batch data from the backend on component mount
  useEffect(() => {
    const fetchBatchData = async () => {
      try {
        const data = await getAllBatches(); // Fetch data from the API
        setBatchData(data.batches || []); // Set batch data in state
        console.log("Fetched Batch Data:", data.batches);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching batches:", err);
        setError("Failed to load batch data");
        setLoading(false);
      }
    };
    fetchBatchData();
  }, []);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <UpcomingBatchWrap>
      <div className="upcoming-batch card">
        <div className="header">
          <h2>Upcoming Batch</h2>
          {/* <p className="sub-heading">Assigned Batch Status</p> */}
          <Link to={"/admin/createdBatches"} className="see-all-batches">
            See All Assigned Batches
          </Link>
        </div>

        {/* Scrollable Table Container */}
        <div className="table-container">
          <table className="batch-table">
            <tbody>
              {batchData.slice(0, 4).map((batch, index) => (
                <tr key={index} className="batch-row">
                  <td>
                    <div className="batch-info">
                      <p className="batch-name">Batch Name</p>
                      <p className="course-name">
                        - {batch.teacher_id?.name || "N/A"}
                      </p>
                    </div>
                  </td>
                  <td>{batch.students?.length || 0} students</td>
                  <td>
                    {batch.start_date
                      ? new Date(batch.start_date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>{batch.start_time ? batch.start_time : "N/A"}</td>
                  <td>
                    <span className={`status ${batch.status.toLowerCase()}`}>
                      {batch.status || "N/A"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </UpcomingBatchWrap>
  );
};

export default UpcomingBatch;
