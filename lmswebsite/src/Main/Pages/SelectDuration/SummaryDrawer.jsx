import React, { useEffect, useState } from "react";
import "./SummaryDrawer.css";

const SummaryDrawer = ({ onClose }) => {
  const [summary, setSummary] = useState({
    selectedBoard: {},
    selectedClass: {},
    selectedBatch: {},
    selectedDuration: {},
    taxes: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    // Fetch data from localStorage
    const board = JSON.parse(localStorage.getItem("selectedBoard")) || {};
    const selectedClass =
      JSON.parse(localStorage.getItem("selectedClass")) || {};
    const batch = JSON.parse(localStorage.getItem("selectedBatch")) || {};
    const duration = JSON.parse(localStorage.getItem("selectedDuration")) || {};

    // Calculate total amount with 18% GST
    const baseTotal = duration.totalAmount || 0;
    const taxes = baseTotal * 0.18; // 18% GST
    const grandTotal = baseTotal + taxes;

    setSummary({
      selectedBoard: board,
      selectedClass,
      selectedBatch: batch,
      selectedDuration: duration,
      taxes: taxes.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
    });
  }, []);

  const handleSignIn = () => {
    // Redirect to sign-in page or perform sign-in action
    window.location.href = "/signup"; // Replace with your sign-in route
  };

  return (
    <div className="drawer-overlay">
      <div className="drawer-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2 className="drawer-title">Your Selections Summary</h2>

        <div className="summary-card">
          <div className="summary-item">
            <span className="summary-label">Board</span>
            <span className="summary-value">
              {summary.selectedBoard.name || "Not Selected"}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Class</span>
            <span className="summary-value">
              {summary.selectedClass.className || "Not Selected"}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Batch</span>
            <span className="summary-value">
              {summary.selectedBatch.mode || "Not Selected"} - ₹
              {summary.selectedBatch.price || "0"}/month
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Duration</span>
            <span className="summary-value">
              {summary.selectedDuration.title || "Not Selected"}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Base Amount</span>
            <span className="summary-value">
              ₹{summary.selectedDuration.totalAmount || "0"}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Taxes (18% GST)</span>
            <span className="summary-value">₹{summary.taxes}</span>
          </div>
          <div className="summary-item total-amount">
            <span className="summary-label">Total Amount</span>
            <span className="summary-value">₹{summary.grandTotal}</span>
          </div>
        </div>

        {/* Sign In Button */}
        <div className="signin-container">
          <button className="signin-btn" onClick={handleSignIn}>
            Sign up to Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryDrawer;
