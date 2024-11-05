import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { PiFunnel } from "react-icons/pi";
import { Link } from "react-router-dom";
import "./CustomerQuery.css";
import { getAllQuerys } from "../../../../api/customerQueryApi";

const CustomerQuery = () => {
  const [queries, setQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all pending queries on component mount
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const data = await getAllQuerys();
        const pendingQueries = data?.queries?.filter(
          (query) => query.queryStatus === "pending"
        );
        setQueries(pendingQueries || []);
      } catch (error) {
        console.error("Error fetching queries:", error);
        setError("Failed to load queries. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredQueries = queries.filter((query) => {
    const title = query?.Title || ""; // Ensure title is defined
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className="Query-batchesNav">
        <h2 className="Query-batchTitle">Customer Queries</h2>
      </div>

      <div className="Query-batchSearch">
        <FaSearch className="Query-searchIcon" />
        <input
          type="search"
          name="search"
          id="Query-search"
          placeholder="Type to search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <PiFunnel className="Query-FunnelIcon" />
      </div>

      <div className="Query-tableContainer">
        {loading ? (
          <p>Loading queries...</p>
        ) : error ? (
          <p className="error_message">{error}</p>
        ) : filteredQueries.length === 0 ? (
          <p>No pending queries found.</p>
        ) : (
          <table>
            <thead>
              <tr className="Query-thead">
                <th className="Query-tdata">Title</th>
                <th className="Query-tdata">Description</th>
                <th className="Query-tdata">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredQueries.map((query, index) => (
                <tr key={index} className="Query-tbody">
                  <td className="Query-tdata">{query.title || "N/A"}</td>
                  <td className="Query-tdata">{query.message || "N/A"}</td>
                  <td className="Query-tdata">
                    <Link to={`/admin/customerQueries/${query._id}`} className="Query-link">
                      {query.queryStatus || "N/A"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default CustomerQuery;
