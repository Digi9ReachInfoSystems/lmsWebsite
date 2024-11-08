import React, { useState, useEffect } from "react";
import { Modal, Box, Button, Typography } from "@mui/material"; // Import necessary components from MUI
import Select from "react-select";
// import { FiFileText, FaUpload } from "react-icons/fi";
import { getAllTeachers } from "../../../../api/teacherApi";
import { getAllStudents } from "../../../../api/studentApi";
import { createBatch } from "../../../../api/batchApi";
import { uploadFileToFirebase } from "../../../../utils/uploadFileToFirebase";
import {
  getClasses,
  getSubjects,
  getTeachersBySubjectAndClass,
  getStudentsBySubjectAndClass,
} from "../../../../services/createBatch";
import styled from "styled-components";
const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  width: 100%;
  z-index: 1000;
  overflow-y: auto;
  max-height: 90vh;
`;

const FormSection = styled.div`
  margin-bottom: 20px;

  h4 {
    margin-bottom: 10px;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }

  .input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;

    .add-button {
      padding: 0 10px;
      border: none;
      background-color: #28a745;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .drop-zone {
    border: 2px dashed #ccc;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    margin-bottom: 10px;
    position: relative;

    &:hover {
      background-color: #f9f9f9;
    }

    p {
      margin: 10px 0;
      color: #666;
    }
  }

  .image-preview {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 10px;

    .image-container {
      position: relative;
      img {
        width: 70px;
        height: 70px;
        object-fit: cover;
        border-radius: 5px;
      }
      .remove-btn {
        position: absolute;
        top: -5px;
        right: -5px;
        background-color: red;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 12px;
        padding: 2px 5px;
      }
    }
  }
`;

const ModalOverlay = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};
const CreateNewBatch = ({ open, handleClose }) => {
  const [batchName, setBatchName] = useState("");
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [noOfClasses, setNoOfClasses] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [contentMaterial, setContentMaterial] = useState("");
  const [batch_image, setBatch_image] = useState(null); // URL of the uploaded image
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const classData = await getClasses();
      setClasses(classData || []);
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    if (classId) {
      const fetchSubjects = async () => {
        const subjectData = await getSubjects(classId);
        setSubjects(subjectData || []);
      };
      fetchSubjects();
    }
  }, [classId]);

  useEffect(() => {
    if (classId && subjectId) {
      const fetchTeachersAndStudents = async () => {
        const teacherData = await getTeachersBySubjectAndClass(
          subjectId,
          classId
        );
        setTeachers(teacherData || []);

        const studentData = await getStudentsBySubjectAndClass(
          subjectId,
          classId
        );
        setStudents(studentData || []);
      };
      fetchTeachersAndStudents();
    }
  }, [classId, subjectId]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const teachersData = await getAllTeachers();
        if (teachersData && teachersData.teachers) {
          setTeachers(teachersData.teachers);
        }
        const studentsData = await getAllStudents();
        if (Array.isArray(studentsData)) {
          setStudents(studentsData);
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

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setBatch_image(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const batchData = {
      batch_name: batchName,
      start_date: startDate,
      end_date: endDate,
      no_of_classes: noOfClasses,
      teacher_ids: selectedTeacher.map((teacher) => teacher.value), // Array of teacher IDs
      student_ids: selectedStudents.map((student) => student.value), // Array of student IDs
      batch_image: coverImage,
      // content_material: contentMaterial,
      // date: new Date(),
    };

    try {
      const response = await createBatch(batchData);
      if (response && response.message) {
        alert("Batch created successfully!");
        handleClose();
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (error) {
      setError("Failed to create batch. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose(); // Close modal when clicking outside the modal content
    }
  };

  return (
    <>
      <ModalOverlay show={open} onClick={() => handleClose()}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <Typography variant="h6" component="h2">
            Create New Batch
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormSection>
              <label>Batch Name</label>
              <input
                type="text"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                required
              />
            </FormSection>

            <FormSection>
              <label>Select Class</label>
              <Select
                options={classes.map((cls) => ({
                  value: cls._id,
                  label: cls.classLevel,
                }))}
                onChange={(option) => setClassId(option.value)}
              />
            </FormSection>

            <FormSection>
              <label>Select Subject</label>
              <Select
                options={subjects.map((subject) => ({
                  value: subject._id,
                  label: subject.subject_name,
                }))}
                onChange={(option) => setSubjectId(option.value)}
              />
            </FormSection>

            <FormSection>
              <label>Select Teachers</label>
              <Select
                isMulti
                options={teachers.map((teacher) => ({
                  value: teacher._id,
                  label: teacher.user_id.name,
                }))}
                onChange={(options) => setSelectedTeacher(options)}
              />
            </FormSection>

            <FormSection>
              <label>Select Students</label>
              <Select
                isMulti
                options={students.map((student) => ({
                  value: student._id,
                  label: student.user_id.name,
                }))}
                onChange={(options) => setSelectedStudents(options)}
              />
            </FormSection>

            <FormSection>
              <label>Upload Batch Image</label>
              <input type="file" onChange={handleFileChange} />
            </FormSection>
            <FormSection>
              <label>Select Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </FormSection>

            <Button
              className="submit-btn"
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Batch"}
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default CreateNewBatch;
