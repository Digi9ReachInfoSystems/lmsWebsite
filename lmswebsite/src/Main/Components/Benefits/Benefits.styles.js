/* General Section */
.benefits-section {
  padding: 4rem 2rem;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
  text-align: center;
}

/* Container */
.benefits-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

/* Left Section - Header */
.benefits-header h2 {
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #101828;
}

.benefits-header h2 span {
  color: #3b82f6; /* Blue Color */
}

.benefits-header p {
  color: #6b7280;
  font-size: 1.1rem;
  line-height: 1.5;
}

/* Right Section - Cards */
.benefits-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: space-between;
}

.benefit-card {
  flex: 1 1 calc(25% - 1rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-5px);
}

/* Icon Styling */
.benefit-icon {
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #3b82f6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

/* Benefit Info */
.benefit-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333333;
}

.benefit-description {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .benefits-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .benefits-cards {
    flex-direction: column;
  }

  .benefit-card {
    flex: 1 1 100%;
  }
}
