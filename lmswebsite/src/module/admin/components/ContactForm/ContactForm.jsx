import React, { useEffect, useState } from 'react';
import './ContactForm.css';
import { getAllQuerys } from '../../../../api/customerQueryApi'; // Import API function

const ContactForms = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the queries from the backend on component mount
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const data = await getAllQuerys(); // Fetch all queries from the API
        console.log('Fetched Queries:', data.queries); // Debug log

        // Filter out only the unsolved queries (querySolved = false)
        const unsolvedQueries = data.queries.filter(
          (query) => query.querySolved === false
        );

        setQueries(unsolvedQueries || []); // Set the filtered queries in state
        setLoading(false);
      } catch (err) {
        console.error('Error fetching queries:', err);
        setError('Failed to load queries');
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="contact-forms card">
      <div className="header">
        <h2>Unsolved Queries</h2>
      </div>

      <ul className="contact-list">
        {queries.map((query, index) => (
          <li key={index} className="contact-item">
            <div className="contact-info">
              <p className="contact-name">{query.title || 'N/A'}</p>
              <p className="contact-email">{query.contactEmail || 'N/A'}</p>
            </div>
            <a href="/" className="view-link">
              View
            </a>
          </li>
        ))}
      </ul>

      <a href="/" className="see-all">
        See All ➤
      </a>
    </div>
  );
};

export default ContactForms;
