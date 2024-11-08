// src/components/CreatedBatch.jsx

import React, { useState, useEffect } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { getAllBatchesNoFilter } from "../../../../api/batchApi"; // Adjust the path if needed
import { Link } from "react-router-dom";
import { CreatedBatchWrap } from "./CreatedBatches.styles";
import DashboardTable from "../../components/DashboardTable/DashboardTable";

export default function CreatedBatch() {
  const [searchInput, setSearchInput] = useState(""); // Initialize searchInput with an empty string
  const [filterData, setFilterData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const columns = [
    "Batch Name",
    "Teacher's Name",
    "No of Students",
    // "No of Classes",
    "Date",
    "Time",
    "Subject",
    "Class",
    "Action",
  ];

  // Fetch data on component mount
  useEffect(() => {
    const apiCaller = async () => {
      const data = await getAllBatchesNoFilter();
      if (data) {
        const dataFilter = data.data.map((batch) => ({
          "Batch Name": batch.batch_name,
          "Teacher's Name": batch.teacher_id?.name || "N/A",
          "No of Students": batch.students.length,
          "No of Classes": batch.no_of_classes,
          Date: new Date(batch.start_date).toLocaleDateString(),
          Time: new Date(batch.date).toLocaleTimeString(),
        }));
        setOriginalData(dataFilter);
        setFilterData(dataFilter); // Set initial table data
      }
    };
    apiCaller();
  }, []);

  // Filter data based on searchInput for "Batch Name"
  useEffect(() => {
    if (searchInput) {
      const filtered = originalData.filter((item) =>
        item["Batch Name"].toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilterData(filtered);
    } else {
      setFilterData(originalData); // Reset to original data if search is empty
    }
  }, [searchInput, originalData]);

  return (
    <CreatedBatchWrap className="content-area">
      <div className="area-row ar-one">
        <div className="created-batch-batches_nav">
          <h2 className="created-batch-batch_title">Created Batches</h2>
          <div className="create-Batch-search">
            <form>
              <div className="input-group">
                <span className="input-icon">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="input-control"
                  placeholder="Search by Batch Name"
                  value={searchInput} // Controlled input
                  onChange={(e) => setSearchInput(e.target.value)} // Update searchInput state on change
                />
              </div>
            </form>
          </div>
          <Link to="/admin/createNewBatch" className="created-batch-batch_btn">
            <AiOutlineFileAdd className="created-batch-batch_icon" />
            <span>Create Batch</span>
          </Link>
        </div>
      </div>
      <div className="area-row ar-two"></div>
      <div className="area-row ar-three">
        {filterData.length > 0 ? (
          <DashboardTable columns={columns} data={filterData} />
        ) : (
          <p>No results found</p>
        )}
      </div>
    </CreatedBatchWrap>
  );
}
