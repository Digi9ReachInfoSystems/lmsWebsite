import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { UserEngagementChartWrap } from "./UserEngagementChart.styles"; // Custom CSS
import { getPaymentStatusChartData } from "../../../../api/studentApi";

const UserEngagementChart = () => {
  const [chartData, setChartData] = useState(null);
  const [filters, setFilters] = useState({ year: "", month: "", day: "" });
  const [loading, setLoading] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  // Dropdown options with a "None" option
  const years = [
    { label: "None", value: "" },
    ...Array.from({ length: 23 }, (_, i) => ({
      label: 2000 + i,
      value: 2000 + i,
    })),
  ];

  const months = [
    { label: "None", value: "" },
    ...Array.from({ length: 12 }, (_, i) => ({
      label: new Date(0, i).toLocaleString("default", { month: "long" }),
      value: i + 1,
    })),
  ];

  const days = [
    { label: "None", value: "" },
    ...Array.from({ length: 31 }, (_, i) => ({
      label: i + 1,
      value: i + 1,
    })),
  ];

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ year: "", month: "", day: "" });
  };

  const buildQueryParams = () => {
    const query = new URLSearchParams();
    if (filters.year && filters.year !== "None")
      query.append("year", filters.year);
    if (filters.month && filters.month !== "None")
      query.append("month", filters.month);
    if (filters.day && filters.day !== "None") query.append("day", filters.day);
    return query.toString();
  };

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const queryParams = buildQueryParams();
      const response = await getPaymentStatusChartData(queryParams);
      const data = await response;

      const labels = data.xData;
      const paidData = data.yData.map((item) => item.paid);
      const unpaidData = data.yData.map((item) => item.unpaid);

      setChartData({
        labels,
        datasets: [
          {
            label: "Paid Users",
            data: paidData,
            borderColor: "#7e7e7e",
            borderWidth: 2,
          },
          {
            label: "Unpaid Users",
            data: unpaidData,
            borderColor: "#F72585",
            borderWidth: 2,
          },
        ],
      });
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch chart data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [filters]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "User Engagement" },
    },
    scales: {
      x: { grid: { display: false } },
      y: { ticks: { stepSize: 1 } },
    },
  };

  return (
    <UserEngagementChartWrap>
      <div className="chart-wrapper">
        {/* Filter Button */}
        <div className="filter-button">
          <Button
            icon="pi pi-filter"
            label="Filter"
            onClick={() => setFilterVisible(!filterVisible)}
            className="p-button-text"
          />
        </div>

        {/* Filter Dropdowns */}
        {filterVisible && (
          <div className="filters-dropdown">
            <Dropdown
              value={filters.year}
              options={years}
              onChange={(e) => handleFilterChange("year", e.value)}
              placeholder="Select Year"
              className="filter-dropdown"
            />
            <Dropdown
              value={filters.month}
              options={months}
              onChange={(e) => handleFilterChange("month", e.value)}
              placeholder="Select Month"
              className="filter-dropdown"
            />
            <Dropdown
              value={filters.day}
              options={days}
              onChange={(e) => handleFilterChange("day", e.value)}
              placeholder="Select Day"
              className="filter-dropdown"
            />
            <Button
              label="Clear Filters"
              icon="pi pi-times"
              onClick={clearFilters}
              className="p-button-outlined p-button-danger clear-button"
            />
          </div>
        )}

        {/* Chart or Loading Indicator */}
        {loading ? (
          <p>Loading chart data...</p>
        ) : (
          <Chart
            className="user-engagement-chart"
            type="line"
            data={chartData}
            options={chartOptions}
          />
        )}
      </div>
    </UserEngagementChartWrap>
  );
};

export default UserEngagementChart;
