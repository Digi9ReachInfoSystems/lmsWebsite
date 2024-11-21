import React, { useState, useEffect } from "react";
import {
  FormContainer,
  FormContext,
  Input,
  Select,
  Button,
  RadioGroup,
  FormItem,
} from "./SubjectForm.style"; // Import your styled-components
import { createSubject } from "../../../../api/subjectApi";
import { getBoards } from "../../../../api/boadApi";
import { getClassesByBoardId } from "../../../../api/classApi";
import { message, Spin, Alert } from "antd"; // Ant Design components for feedback

const SubjectForm = () => {
  const [formData, setFormData] = useState({
    subject_name: "",
    class_id: "",
    language: "english",
    board_id: "",
    is_grammar_subject: "false",
    approval_status: "pending",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [classesError, setClassesError] = useState(null);

  const [boards, setBoards] = useState([]);
  const [loadingBoards, setLoadingBoards] = useState(false);
  const [boardsError, setBoardsError] = useState(null);

  // Fetch all boards on component mount
  useEffect(() => {
    const fetchBoards = async () => {
      setLoadingBoards(true);
      setBoardsError(null);
      try {
        const fetchedBoards = await getBoards();
        setBoards(fetchedBoards);
      } catch (error) {
        setBoardsError(
          error.response?.data?.error || "Failed to fetch boards."
        );
      } finally {
        setLoadingBoards(false);
      }
    };

    fetchBoards();
  }, []);

  // Fetch classes whenever board_id changes
  useEffect(() => {
    if (!formData.board_id) {
      setClasses([]);
      return;
    }

    const fetchClasses = async () => {
      setLoadingClasses(true);
      setClassesError(null);
      try {
        const fetchedClasses = await getClassesByBoardId(formData.board_id);
        setClasses(fetchedClasses);
      } catch (error) {
        setClassesError(
          error.response?.data?.error || "Failed to fetch classes."
        );
      } finally {
        setLoadingClasses(false);
      }
    };

    fetchClasses();
  }, [formData.board_id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        submissionPayload.append(key, formData[key]);
      });

      await createSubject(submissionPayload);
      message.success("Subject created successfully!");

      // Reset form fields
      setFormData({
        subject_name: "",
        class_id: "",
        language: "english",
        is_grammar_subject: "false",
        approval_status: "pending",
        board_id: "",
      });
      setClasses([]);
    } catch (error) {
      const errorMsg =
        error.response?.data?.error ||
        error.message ||
        "Failed to create subject. Please try again.";
      message.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <h2>Create Subject</h2>

      {/* Display error messages or loading spinners */}
      {(loadingBoards || loadingClasses) && <Spin tip="Loading..." />}
      {(boardsError || classesError) && (
        <Alert
          message={boardsError || classesError}
          type="error"
          showIcon
          style={{ marginBottom: "1em" }}
        />
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Subject Name */}
        <FormItem>
          <label htmlFor="subject_name">Subject Name</label>
          <Input
            type="text"
            id="subject_name"
            name="subject_name"
            placeholder="Enter Subject Name"
            value={formData.subject_name}
            onChange={handleChange}
            required
          />
        </FormItem>

        {/* Board ID */}
        <FormItem>
          <label htmlFor="board_id">Board</label>
          <Select
            id="board_id"
            name="board_id"
            value={formData.board_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Board</option>
            {boards.map((board) => (
              <option key={board._id} value={board._id}>
                {board.name}
              </option>
            ))}
          </Select>
        </FormItem>

        {/* Class ID */}
        <FormItem>
          <label htmlFor="class_id">Class</label>
          <Select
            id="class_id"
            name="class_id"
            value={formData.class_id}
            onChange={handleChange}
            required
            disabled={!formData.board_id || loadingClasses}
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                Class: {cls.classLevel}
              </option>
            ))}
          </Select>
        </FormItem>

        {/* Language */}
        <FormItem>
          <label htmlFor="language">Language</label>
          <Select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
          </Select>
        </FormItem>

        {/* Is Grammar Subject */}
        <FormItem>
          <label>Is Grammar Subject?</label>
          <RadioGroup>
            <label>
              <input
                type="radio"
                name="is_grammar_subject"
                value="true"
                checked={formData.is_grammar_subject === "true"}
                onChange={handleChange}
              />
              True
            </label>
            <label>
              <input
                type="radio"
                name="is_grammar_subject"
                value="false"
                checked={formData.is_grammar_subject === "false"}
                onChange={handleChange}
              />
              False
            </label>
          </RadioGroup>
        </FormItem>

        {/* Submit Button */}
        <FormItem>
          <Button type="submit" disabled={isSubmitting || loadingClasses}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </FormItem>
      </form>
    </FormContainer>
  );
};

export default SubjectForm;
