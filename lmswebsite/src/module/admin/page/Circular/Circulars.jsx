import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { PiFunnel } from "react-icons/pi";
import { FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Circulars.css";
import { getAllCircularNotificationsApi } from "../../../../api/circularNotificationApi";

const Circulars = () => {
  const [circulars, setCirculars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Track selected image
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility

  useEffect(() => {
    const fetchCirculars = async () => {
      try {
        const data = await getAllCircularNotificationsApi();
        console.log("Fetched Circulars:", data);
        setCirculars(data.circularNotifications || []);
      } catch (error) {
        console.error("Error fetching circular notifications:", error);
        setError("Failed to load circulars. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCirculars();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredCirculars = circulars.filter((circular) => {
    const title = circular?.circularName || "";
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filter || circular.approval_status === filter)
    );
  });

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="Circulars-batchesNav">
        <h2 className="Circulars-batchTitle">Circulars</h2>
        <Link to="/admin/createcircular" className="Circulars-batchBtn">
          <FiFileText className="Circulars-batchIcon" />
          <span>Create Circular</span>
        </Link>
      </div>

      <div className="Circulars-batchSearch">
        <FaSearch className="Circulars-searchIcon" />
        <input
          type="search"
          name="search"
          id="Circulars-search"
          placeholder="Type to search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <PiFunnel className="Circulars-FunnelIcon" />
      </div>

      <div className="Circulars-tableContainer">
        {loading ? (
          <p>Loading circulars...</p>
        ) : error ? (
          <p className="error_message">{error}</p>
        ) : filteredCirculars.length === 0 ? (
          <p>No circulars found.</p>
        ) : (
          <table>
            <thead>
              <tr className="Circulars-thead">
                <th className="Circulars-tdata">Title</th>
                <th className="Circulars-tdata">Description</th>
                <th className="Circulars-tdata">Send to</th>
                <th className="Circulars-tdata">Image</th>
              </tr>
            </thead>
            <tbody>
              {filteredCirculars.map((circular, index) => (
                <tr key={index} className="Circulars-tbody">
                  <td className="Circulars-tdata">{circular.circularName || "N/A"}</td>
                  <td className="Circulars-tdata">{circular.content || "N/A"}</td>
                  <td className="Circulars-tdata">{circular.sentTo || "N/A"}</td>
                  <td className="Circulars-tdata">
                    <button
                      className="Circulars-link"
                      onClick={() => openModal(circular.image)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img src={selectedImage} alt="Circular" width={"100"} height={"100"}   className="modal-image" />
          </div>
        </div>
      )}
    </>
  );
};

export default Circulars;
