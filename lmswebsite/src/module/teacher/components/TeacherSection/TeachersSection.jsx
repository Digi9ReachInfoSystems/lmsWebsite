import React, { useEffect, useState } from "react";
import api from "../.././../../config/axiosConfig";
import "./TeachersSection.css"; // Import the CSS file

const TeachersSection = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get("/teachers/experience/greater");
        // Assuming response.data is an array of teacher objects sorted by experience
        setTeachers(response.data.slice(0, 3)); // Get the top 3 experienced teachers
        setLoading(false);
      } catch (err) {
        console.error("Error fetching teachers:", err);
        setError("Failed to load teachers data");
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="teachers-section">
      <h2 className="section-title">Meet Our Experienced Teachers</h2>
      <div className="teachers-grid">
        {teachers.map((teacher, index) => (
          console.log(teacher),
          <div key={index} className="teacher-card">
            <img
              src={teacher.profile_image || 'default-image-path.jpg'} // Use a default image if not provided
              alt={teacher.name}
              className="teacher-image"
            />
            <div className="teacher-info">
              <h3 className="teacher-name">{teacher.name}</h3>
              <p className="teacher-subject">{teacher.subject}</p>
              <p className="teacher-experience">
                Experience: {teacher.experience} years
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeachersSection;
