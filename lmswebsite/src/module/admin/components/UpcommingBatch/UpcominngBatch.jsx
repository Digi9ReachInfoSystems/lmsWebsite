import React, { useEffect, useState } from 'react';
import './UpcomingBatch.css';
import { getAllBatches } from '../../../../api/batchApi'; // Import the API function
import { Link } from 'react-router-dom';

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
        console.log('Fetched Batch Data:', data.batches);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching batches:', err);
        setError('Failed to load batch data');
        setLoading(false);
      }
    };
    fetchBatchData();
  }, []);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="upcoming-batch card">
      <div className="upcoming-batch-header">
        <h2>Upcoming Batch</h2>
        <p className="upcoming-batch-sub-heading">Assigned Batch Status</p>
        <Link to={'/admin/createdBatches'} className='see-all-batches'>
          See All Assigned Batches ➤
        </Link>
      </div>

      {/* Scrollable Table Container */}
      <div className="table-container">
        <table className="batch-table">
          <thead>
            <tr>
              <th>Batch Name</th>
              <th>Teacher Name</th>
              <th>Students Count</th>
              <th>No of Classes</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {batchData.map((batch, index) => (
              <tr key={index}>
                <td>{batch.batch_name}</td>
                <td>{batch.teacher_id?.name || 'N/A'}</td>
                <td>{batch.students?.length || 0} Students</td>
                <td>{batch.no_of_classes || 0}</td>
                <td>
                  {batch.start_date
                    ? new Date(batch.start_date).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td>
                  {batch.date
                    ? new Date(batch.date).toLocaleTimeString()
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingBatch;
