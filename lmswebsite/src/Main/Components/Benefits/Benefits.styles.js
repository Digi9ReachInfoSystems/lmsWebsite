/* General Section */
.benefits-section {
  background-color: #f9fafb;
  padding: 4rem 2rem;
  font-family: Arial, sans-serif;
}

/* Header Section */
.benefits-header {
  text-align: center;
  margin-bottom: 2rem;
}

.benefits-cards {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap; /* Wrap to next line on small screens */
}

.benefit-card {
  width: 22%; /* 4 cards in a row on large screens */
  min-width: 250px; /* Ensures cards don't shrink too small */
  flex: 1 1 calc(25% - 1rem); /* Adjusts card size dynamically */
}

/* Icon Styling */
.benefit-icon {
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  color: #3b82f6;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 50%;
  margin: 0 auto 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
