import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { PiFunnel } from "react-icons/pi";
import "../RegisteredList/RegisteredList.css";
import { getAllStudents } from "../../../../api/studentApi";
import { getAllTeachers } from "../../../../api/teacherApi";

const RegisteredList = () => {
  const [activeTable, setActiveTable] = useState("student");
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleButtonClick = (tableType) => {
    setActiveTable(tableType);
    setCurrentPage(1);
    setLoading(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTable === "student") {
          const studentData = await getAllStudents();
          setStudents(studentData);
        } else {
          const teacherData = await getAllTeachers();
          setTeachers(teacherData.teachers);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTable]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = (data) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  };

  const totalPages = Math.ceil(
    (activeTable === "student" ? students.length : teachers.length) / rowsPerPage
  );

  const renderStudentRow = (student, index) => {
    const { user_id, phone_number, class: studentClass } = student || {};
    const studentName = user_id?.name || "N/A";
    const studentEmail = user_id?.email || "N/A";
    const classLevel = studentClass?.classLevel || "N/A";

    return (
      <tr key={index} className="RegisteredList-Studenttbody">
        <td className="RegisteredList-Studenttdata">{studentName}</td>
        <td className="RegisteredList-Studenttdata">{studentEmail}</td>
        <td className="RegisteredList-Studenttdata">{phone_number || "N/A"}</td>
        <td className="RegisteredList-Studenttdata">{classLevel}</td>
      </tr>
    );
  };

  const renderTeacherRow = (teacher, index) => {
    const { user_id, phone_number, qualifications } = teacher || {};
    const teacherName = user_id?.name || "N/A";
    const teacherEmail = user_id?.email || "N/A";

    return (
      <tr key={index} className="RegisteredList-teacherTbody">
        <td className="RegisteredList-teacherTdata">{teacherName}</td>
        <td className="RegisteredList-teacherTdata">{teacherEmail}</td>
        <td className="RegisteredList-teacherTdata">{phone_number || "N/A"}</td>
        <td className="RegisteredList-teacherTdata">{qualifications || "N/A"}</td>
      </tr>
    );
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <div className="RegisteredList-batchesNav">
        <div className="RegisteredList-batchForm">
          <h2 className="RegisteredList-batchTitle">Registered List</h2>
        </div>
        <div className="RegisteredList-batchBtn">
          <button
            className={`RegisteredList-batchStudent ${
              activeTable === "student" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("student")}
          >
            <span> Student </span>
          </button>
          <button
            className={`RegisteredList-batchTeacher ${
              activeTable === "teacher" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("teacher")}
          >
            <span> Teacher </span>
          </button>
        </div>
      </div>

      <div className="RegisteredList-batchSearch">
        <FaSearch className="RegisteredList-searchIcon" />
        <input
          type="search"
          name="search"
          id="RegisteredList-search"
          placeholder="Type to search"
        />
        <PiFunnel className="RegisteredList-FunnelIcon" />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error_message">{error}</p>
      ) : activeTable === "student" ? (
        <div className="RegisteredList-StudentTableContainer">
          <table>
            <thead>
              <tr className="RegisteredList-Studentthead">
                <th className="RegisteredList-Studenttdata">Name</th>
                <th className="RegisteredList-Studenttdata">Email ID</th>
                <th className="RegisteredList-Studenttdata">Phone Number</th>
                <th className="RegisteredList-Studenttdata">Class Level</th>
              </tr>
            </thead>
            <tbody>{paginatedData(students).map(renderStudentRow)}</tbody>
          </table>
        </div>
      ) : (
        <div className="RegisteredList-teacherTableContainer">
          <table>
            <thead>
              <tr className="RegisteredList-teacherThead">
                <th className="RegisteredList-teacherTdata">Name</th>
                <th className="RegisteredList-teacherTdata">Email ID</th>
                <th className="RegisteredList-teacherTdata">Phone Number</th>
                <th className="RegisteredList-teacherTdata">Qualification</th>
              </tr>
            </thead>
            <tbody>{paginatedData(teachers).map(renderTeacherRow)}</tbody>
          </table>
        </div>
      )}

      <div className="RegisteredList-pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default RegisteredList;
