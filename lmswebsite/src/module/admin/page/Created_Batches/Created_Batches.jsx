// src/components/CreatedBatch.jsx

import React, { useState, useEffect } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { PiFunnel } from "react-icons/pi";
import { getAllBatches } from "../../../../api/batchApi"; // Adjust the path if needed
import "./Created_Batches.css";
import { Link } from "react-router-dom";

const CreatedBatch = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Number of records per page

  // Fetch batches with pagination and search term
  useEffect(() => {
    const fetchBatches = async () => {
      setLoading(true); // Set loading state
      try {
        const data = await getAllBatches({
          page: currentPage,
          limit: pageSize,
          search: searchTerm,
        });

        if (data && data.batches) {
          setBatches(data.batches);
          setTotalPages(data.totalPages);
        } else {
          setError("No batches found.");
        }
      } catch (err) {
        setError("Failed to fetch batches.");
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, [currentPage, searchTerm]);

  // Handle page navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Filter batches based on search term
  const filteredBatches = batches.filter((batch) =>
    batch.batch_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading batches...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <><div className="created-Batch-container">


      {/* Navigation Section */}
      <div className="batches_nav">
        <h2 className="batch_title">Created Batches</h2>
        <Link to="/admin/createNewBatch" className="batch_btn">
          <AiOutlineFileAdd className="batch_icon" />
          <span>Create Batch</span>
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div className="batch_search">
        <FaSearch className="search_icon" />
        <input
          type="search"
          name="search"
          placeholder="Type to search"
          className="search_input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <PiFunnel className="Funnel_icon" />
      </div>

      {/* Batch Table Section */}
      <div className="table-wrapper">
        <div className="table-container">
          <table>
            <thead>
              <tr className="thead">
                <th className="tdata">Batch</th>
                <th className="tdata">Teacher's Name</th>
                <th className="tdata">No of Students</th>
                <th className="tdata">No of Classes</th>
                <th className="tdata">Date</th>
                <th className="tdata">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatches.length > 0 ? (
                filteredBatches.map((batch) => (
                  <tr key={batch._id} className="tbody">
                    <td className="tdata">{batch.batch_name}</td>
                    <td className="tdata">
                      {batch.teacher_id?.name || "N/A"}
                    </td>
                    <td className="tdata">{batch.students.length}</td>
                    <td className="tdata">{batch.no_of_classes}</td>
                    <td className="tdata">
                      {new Date(batch.start_date).toLocaleDateString()}
                    </td>
                    <td className="tdata">
                      {new Date(batch.date).toLocaleTimeString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="tdata" colSpan="6">
                    No batches found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination Section */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
    </>
  );
};

export default CreatedBatch;
