import React, { useState, useEffect } from "react";
import "./ExploreMaterial.css";
import { getPackageByClassId } from "../../../api/packagesApi";
import { getAllClasses } from "../../../api/classApi";

const ExploreMaterial = () => {
  const [classes, setClasses] = useState([]); // Fetched classes
  const [selectedClass, setSelectedClass] = useState(null); // Selected class ID
  const [packages, setPackages] = useState([]); // Fetched packages
  const [loading, setLoading] = useState(false); // Loading indicator

  // Fetch all classes when the component mounts
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const fetchedClasses = await getAllClasses(); // Fetch classes from API
        console.log("Fetched Classes:", fetchedClasses);

        const limitedClasses = fetchedClasses.slice(0, 5); // Limit to 5 classes
        setClasses(limitedClasses);

        // Set the first class as the default selected class
        if (limitedClasses.length > 0) {
          setSelectedClass(limitedClasses[0]._id); // Use _id directly
        }
      } catch (error) {
        console.error("Error fetching classes:", error.message);
      }
    };

    fetchClasses();
  }, []);

  // Fetch packages based on selected class
  useEffect(() => {
    const fetchPackages = async () => {
      if (!selectedClass) return;

      setLoading(true);
      try {
        const mode = "normal"; // Fixed mode value; update if needed
        console.log("Fetching packages for Class ID:", selectedClass, "Mode:", mode);

        const fetchedPackages = await getPackageByClassId(selectedClass, mode);
        console.log("Fetched Packages:", fetchedPackages);

        if (Array.isArray(fetchedPackages)) {
          setPackages(fetchedPackages);
        } else {
          setPackages([]);
          console.warn("Invalid packages response format");
        }
      } catch (error) {
        console.error("Error fetching packages:", error.message);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [selectedClass]);

  return (
    <section className="explore-material-section">
      <div className="container">
        {/* Header */}
        <div className="explore-header">
          <h2>Explore Packages</h2>
          <p>Select a class to view its associated packages.</p>
        </div>

        {/* Class Selection */}
        <div className="class-selection">
          {classes.map((cls) => (
            <button
              key={cls._id}
              className={`class-button ${
                selectedClass === cls._id ? "active" : ""
              }`}
              onClick={() => setSelectedClass(cls._id)}
            >
              {cls.className}
            </button>
          ))}
        </div>

        {/* Packages Section */}
        <div className="packages-container">
          {loading ? (
            <p>Loading packages...</p>
          ) : packages.length > 0 ? (
            packages.map((pkg) => (
              <div key={pkg._id} className="package-card">
                <img
                  src={pkg.image}
                  alt={pkg.package_name}
                  className="package-image"

                />
                <div className="package-content">
                  <h3 className="package-title">Package Name:{pkg.package_name}</h3>
                  <p className="package-description">Description:{pkg.description}</p>
                  <p className="package-price">Price: ₹{pkg.price}</p>
                </div>
                <button className="buy-now-button">
                  <a href='./login'>Buy Now</a>
                </button>
              </div>
            ))
          ) : (
            <p>No packages available for this class.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExploreMaterial;




