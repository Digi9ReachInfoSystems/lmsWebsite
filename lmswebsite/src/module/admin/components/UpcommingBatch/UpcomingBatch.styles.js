import styled from "styled-components";

export const UpcomingBatchWrap = styled.div`
  .card {
    background-color: #f9f9f9;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 98%;
  }

  /* Header section */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: 14px;
  }

  .sub-heading {
    font-size: 14px;
    color: #6b7280;
  }

  .see-all-batches {
    color: #f472b6;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
  }

  /* Scrollable Table Container */
  .table-container {
    max-height: 400px;
    overflow-y: auto;
    scrollbar-width: none; /* Hide scrollbar in Firefox */
  }

  .table-container::-webkit-scrollbar {
    display: none; /* Hide scrollbar in WebKit browsers */
  }

  /* Table styling */
  .batch-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }

  .batch-row {
    border-bottom: 1px solid #e5e7eb;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .batch-info {
    display: flex;
    flex-direction: column;
  }

  .batch-name,
  .course-name,
  .batch-table td,
  .batch-table th {
    font-size: 14px; /* Consistent text size */
    color: #374151;
  }

  .batch-name {
    font-weight: 700;
    color: #1f2937;
    margin: 0;
  }

  .course-name {
    font-size: 13px;
    color: #6b7280;
  }

  .batch-table th {
    background-color: white;
    font-weight: 700;
    color: #1f2937;
  }

  /* Status styling */
  .status {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px; /* Uniform text size */
    font-weight: 600;
    color: white;
    display: inline-flex;
    align-items: center;
  }

  .status.completed {
    background-color: #d1fae5;
    color: #065f46;
  }

  .status.pending {
    background-color: #fef9c3;
    color: #92400e;
  }

  .status.canceled {
    background-color: #fee2e2;
    color: #b91c1c;
  }

  .status.ongoing {
    background-color: #bfdbfe;
    color: #1e40af;
  }

  /* Responsive styling */
  @media (max-width: 768px) {
    .card {
      padding: 15px;
    }

    .batch-table td,
    .batch-table th {
      font-size: 13px; /* Reduce text size for smaller screens */
    }

    .batch-name,
    .course-name {
      font-size: 13px; /* Consistent text size */
    }

    .status {
      font-size: 11px; /* Reduce status text size */
    }
  }

  @media (max-width: 480px) {
    .card {
      padding: 10px;
    }

    .batch-table td,
    .batch-table th {
      font-size: 12px; /* Smaller text size for mobile devices */
    }

    .batch-name,
    .course-name {
      font-size: 12px; /* Consistent text size */
    }

    .status {
      font-size: 10px; /* Further reduce status text size */
    }
  }
`;
