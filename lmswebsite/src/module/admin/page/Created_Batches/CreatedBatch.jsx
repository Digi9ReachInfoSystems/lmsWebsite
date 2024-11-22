import React, { useState, useEffect } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { getAllBatchesNoFilter,getAllBatches } from "../../../../api/batchApi"; // Adjust the path if needed
import { CreatedBatchWrap } from "./CreatedBatches.styles";
import DashboardTable from "../../components/DashboardTable/DashboardTable";
import CreateNewBatch from "../createNewBatch/CreateNewBatch"; // Import the modal component
import FormModel from "../../components/FormModel/FormModel";

export default function CreatedBatch() {
  const [searchInput, setSearchInput] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal

  const columns = [
    "Batch Name",
    "Teacher's Name",
     "No of Students",
    "Date",
    "Time",
    "Subject",
    "Class",
  ];

  // Fetch data on component mount
  useEffect(() => {
    const apiCaller = async () => {
      try {
        const data = await getAllBatches();
        if (data && Array.isArray(data.batches)) {
          const dataFilter = data.batches.map((batch) => ({
            "Batch Name": batch.batch_name,
            "Teacher's Name":[ batch.teacher_id.map((teacher) => teacher.user_id.name+",")],
            "No of Students": batch.students ? batch.students.length : 0,
            Date: new Date(batch.date).toLocaleDateString(),
            Time: new Date(batch.date).toLocaleTimeString(),
            Subject: batch.subject_id?.subject_name || "N/A",
            Class: batch.class_id?.classLevel || "N/A",
          }));
          setOriginalData(dataFilter);
          setFilterData(dataFilter); // Set initial table data
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching batches:', error);
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

  const handleOpenModal = () => {
    setIsModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

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
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            </form>
          </div>
          {/* Link replaced with button to open modal */}
          <button
            onClick={handleOpenModal} // Open modal on click
            className="created-batch-batch_btn"
          >
            <AiOutlineFileAdd className="created-batch-batch_icon" />
            <span>Create Batch</span>
          </button>
        </div>
      </div>
      <div className="area-row ar-two"></div>
      <div className="area-row ar-three">
        {filterData.length > 0 ? (
          <DashboardTable columns={columns} data={filterData} />
        ) : (
          <p>No results found</p>
        )}
        {
          isModalOpen ? <FormModel isOpen={isModalOpen} onClose={handleCloseModal} children={<CreateNewBatch />} /> : null
        }
      </div>

      {/* CreateNewBatch Modal */}
      <CreateNewBatch open={isModalOpen} handleClose={handleCloseModal} />
    </CreatedBatchWrap>
  );
}
