import React, { useState, useEffect } from "react";
import "./ExpertTeachers.css";
import { getTeachersByExperience } from "../../../api/teacherApi";

const ExpertTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getTeachersByExperience();
        console.log("Teachers fetched successfully:", response);

        // Sort and limit to top 3 experienced teachers
        const topTeachers = response
          .sort((a, b) => b.experience - a.experience) // Sort by experience descending
          .slice(0, 4); // Get top 3 teachers

        setTeachers(topTeachers);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="expert-teachers-section">
      {/* Title and Subtitle */}
      <div className="teachers-header">
        <h2>Meet Our Instructors</h2>
        <p>
          Education is the most powerful weapon which you can use to change the
          world. Leadership is not about a title or a designation.
        </p>
      </div>

      {/* Teacher Cards */}
      <div className="teachers-container">
        {teachers.map((teacher, index) => (
          <div key={teacher._id} className="teacher-card">
            <img
              src={teacher.profile_image}
              alt={`Profile of ${teacher?.user_id?.name || "Teacher"}`}
              className="teacher-image"
            />
            <div className="teacher-info">
              <h3 className="teacher-name">{teacher?.user_id?.name || "Name not available"}</h3>
              <p className="teacher-location">
                Qualification: {teacher.qualifications || "Not specified"}
              </p>
              <p className="teacher-experience">
                Experience: {teacher.experience || 0} years
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpertTeachers;
