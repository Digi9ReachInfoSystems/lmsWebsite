import React, { useState } from "react";
import { DashboarTablewrap } from "./DashboardTable.styles";
// import "./DashboardTable.css";

const DashboardTable = ({ columns, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6; // Adjust as needed

  // Calculate the current rows to display
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <DashboarTablewrap>
      <div className="DashboardTable-table-container">
        <table>
          <thead>
            <tr className="DashboardTable-thead">
              {columns.map((column, index) => (
                <th key={index} className="DashboardTable-tdata">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="DashboardTable-tbody">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="DashboardTable-tdata">
                    {row[column] || "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="DashboardTable-pagination-controls">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="DashboardTable-pagination-button"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`DashboardTable-pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="DashboardTable-pagination-button"
          >
            Next
          </button>
        </div>
      </div>
    </DashboarTablewrap>
  );
};

export default DashboardTable;
