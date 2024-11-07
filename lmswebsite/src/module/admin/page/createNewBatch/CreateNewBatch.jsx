import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FiFileText } from "react-icons/fi";
import "../CreateNewBatch/CreateNewBatch.css";
import { getAllTeachers } from "../../../../api/teacherApi";
import { getAllStudents } from "../../../../api/studentApi";
import { createBatch } from "../../../../api/batchApi";
import { Link } from "react-router-dom";
import { uploadFileToFirebase } from "../../../../utils/uploadFileToFirebase";

const CreateNewBatch = () => {
  // State for form inputs
  const [batchName, setBatchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [noOfClasses, setNoOfClasses] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [contentMaterial, setContentMaterial] = useState("");
  const [loading, setLoading] = useState(false);
  const [batch_image, setBatch_image] = useState(null);
  const [error, setError] = useState("");

  // State for fetched data
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  // Fetch teachers and students on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Teachers
        const teachersData = await getAllTeachers();
        console.log("Fetched Teachers Data:", teachersData); // Debugging
        if (teachersData && teachersData.teachers) {
          setTeachers(teachersData.teachers);
        } else {
          console.warn("Teachers data format unexpected:", teachersData);
          setError("Unexpected format for teachers data.");
        }

        // Fetch Students
        const studentsData = await getAllStudents();
        console.log("Fetched Students Data:", studentsData); // Debugging
        if (Array.isArray(studentsData)) {
          setStudents(studentsData);
        } else {
          console.warn("Students data format unexpected:", studentsData);
          setError("Unexpected format for students data.");
        }
      } catch (err) {
        console.error("Error fetching teachers or students:", err);
        setError("Failed to fetch teachers or students.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleFileChange = (e) => {
    const { files } = e.target;
    setBatch_image(files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (
      !batchName ||
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime ||
      !noOfClasses ||
      !selectedTeacher ||
      !batch_image ||
      selectedStudents.length === 0 ||
      !contentMaterial
    ) {
      setError("Please fill in all the required fields.");
      return;
    }

    // Additional validation
    if (new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be after end date.");
      return;
    }

    if (startTime >= endTime) {
      setError("Start time must be before end time.");
      return;
    }
    const image_url = await uploadFileToFirebase(batch_image, "batch-images");
    setBatch_image(image_url);

    // Prepare data for the backend
    const responseData = {
      batch_name: batchName,
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime,
      no_of_classes: noOfClasses,
      teacher_id: selectedTeacher,
      students: selectedStudents,
      batch_image,
      contentMaterial,
      date: new Date(),
    };

    try {
      setLoading(true);
      const response = await createBatch(responseData);
      console.log("Create Batch Response:", response); // Debugging
      if (response && response.message) {
        // Handle success
        alert("Batch created successfully!");
        // Reset form fields
        setBatchName("");
        setStartDate("");
        setEndDate("");
        setStartTime("");
        setEndTime("");
        setNoOfClasses("");
        setSelectedTeacher("");
        setSelectedStudents([]);
        setContentMaterial("");
        setBatch_image(null);
      } else {
        console.warn("Unexpected response from createBatch:", response);
        setError("Unexpected response from the server.");
      }
    } catch (err) {
      console.error("Error creating batch:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to create batch. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Transform students data for react-select
  console.log(students);
  // const studentOptions = students.map((student) => ({
  //   value: student.user_id._id,
  //   label: student.user_id.name,
  // }));

  // const teacherOptions = teachers.map((teacher) => ({
  //   value: teacher.user_id._id,
  //   label: teacher.user_id.name,
  // }));

  // Handle student selection with react-select
  const handleStudentSelectChange = (selectedOptions) => {
    const selected = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedStudents(selected);
  };

  return (
    <>
      <div className="createBatch-container">
        <div className="batches_nav">
          <h2 className="batch_title">Create Batch</h2>
          <Link to={"/admin/createdBatches"} className="batch_btn">
            <FiFileText className="batch_icon" />
            <span> Created Batches </span>
          </Link>
        </div>
        {loading && <p>Loading...</p>}
        <form onSubmit={handleSubmit} className="batch_form">
          <label htmlFor="input_Name" className="batch_Label">
            Course Name:
            <input
              type="text"
              id="input_Name"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              required
              disabled={loading}
            />
          </label>
          <label className="batch_Label">
            Course Date:
            <input
              type="date"
              id="Start_Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="date"
              id="End_Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              disabled={loading}
            />
          </label>
          <label className="batch_Label">
            Timings:
            <input
              type="time"
              id="Start_Time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="time"
              id="End_Time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              disabled={loading}
            />
          </label>
          <label htmlFor="Class" className="batch_Label">
            No of Classes:
            <input
              type="number"
              id="Class"
              value={noOfClasses}
              onChange={(e) => setNoOfClasses(e.target.value)}
              required
              disabled={loading}
            />
          </label>
          <label htmlFor="Teacher" className="batch_Label">
            Teacher:
            <select
              id="Teacher"
              name="Teacher"
              // options={teacherOptions}
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              required
              disabled={loading}
            >
              <option value="">-- Select Teacher --</option>
              {/* {teachers.length > 0 ? (
                teachers.map((teacher) => (
                  <option key={teacher.user_id._id} value={teacher.user_id._id}>
                    {teacher.user_id.name}
                  </option>
                ))
              ) : (
                <option disabled>Loading teachers...</option>
              )} */}
            </select>
          </label>
          <label htmlFor="Student" className="batch_Label">
            Select Students:
            <Select
              isMulti
              name="students"
              id="students"
              // options={studentOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              // value={studentOptions.filter((option) =>
              //   selectedStudents.includes(option.value)
              // )}
              onChange={handleStudentSelectChange}
              placeholder="Select Students..."
              isDisabled={loading || students.length === 0}
              required
            />
          </label>
          <label htmlFor="Meta_Image" className="batch_Label">
            Meta Image:
            <input
              type="file"
              id="Meta_Image"
              className="meta_image_input"
              onChange={handleFileChange}
            />
          </label>
          <label htmlFor="Content_Material" className="batch_Label">
            Content Material:
            <input
              type="text"
              id="Content_Material"
              value={contentMaterial}
              onChange={(e) => setContentMaterial(e.target.value)}
              required
              disabled={loading}
            />
          </label>
          {error && <p className="error_message">{error}</p>}
          <input
            type="submit"
            value={loading ? "Creating..." : "Create Batch"}
            id="Submit"
            disabled={loading}
          />
        </form>
      </div>
    </>
  );
};

export default CreateNewBatch;
