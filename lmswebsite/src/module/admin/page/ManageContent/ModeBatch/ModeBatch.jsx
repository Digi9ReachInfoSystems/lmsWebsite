import React, { useState, useEffect } from "react";
import {
  Form as AntdForm,
  Input as AntdInput,
  Select as AntdSelect,
  Button as AntdButton,
  Alert,
} from "antd";
import { FaPlus, FaTrash } from "react-icons/fa";
import { createTypeOfBatch } from "../../../../../api/typeOfBatchApi";
import { getBoards } from "../../../../../api/boardApi";
import { getClassesByBoardId } from "../../../../../api/classApi";
import { getSubjectsByClassId } from "../../../../../api/subjectApi";

const { Option } = AntdSelect;

const ModeBatch = () => {
  // State
  const [mode, setMode] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [title, setTitle] = useState("");
  const [boardData, setBoardData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [classData, setClassData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [subjectData, setSubjectData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  const MAX_FEATURES = 10;

  // Fetch boards only after `mode` is set (non-empty)
  useEffect(() => {
    if (mode === "") return;
    const fetchBoards = async () => {
      try {
        const boards = await getBoards();
        setBoardData(boards);
      } catch (err) {
        console.error("Error fetching boards:", err);
      }
    };
    fetchBoards();
  }, [mode]);

  // Fetch classes by board
  useEffect(() => {
    const fetchClasses = async () => {
      if (!selectedBoard) return;
      try {
        const classDataresponse = await getClassesByBoardId(selectedBoard);
        setClassData(classDataresponse);
      } catch (err) {
        console.error("Error fetching classes:", err);
      }
    };
    fetchClasses();
  }, [selectedBoard]);

  // Fetch subjects by class
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!selectedClass) return;
      try {
        const subjectDataresponse = await getSubjectsByClassId(selectedClass);
        setSubjectData(subjectDataresponse);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };
    fetchSubjects();
  }, [selectedClass]);

  // Calculate discounted price
  useEffect(() => {
    if (price && discountPercentage !== "") {
      const discount = (parseFloat(discountPercentage) / 100) * parseFloat(price);
      const calculatedDiscountedPrice = parseFloat(price) - discount;
      setDiscountedPrice(calculatedDiscountedPrice.toFixed(2));
    } else {
      setDiscountedPrice("");
    }
  }, [price, discountPercentage]);

  // Handle feature input
  const handleAddFeature = () => {
    const trimmedFeature = featureInput.trim();
    if (trimmedFeature) {
      if (features.includes(trimmedFeature)) {
        setError("This feature has already been added.");
        return;
      }
      if (features.length >= MAX_FEATURES) {
        setError(`You can only add up to ${MAX_FEATURES} features.`);
        return;
      }
      setFeatures([...features, trimmedFeature]);
      setFeatureInput("");
      setError("");
    }
  };

  const handleRemoveFeature = (featureToRemove) => {
    setFeatures(features.filter((feature) => feature !== featureToRemove));
    setError("");
  };

  const handleFeatureKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFeature();
    }
  };

  // AntD form submission
  const onFinish = async () => {
    setError("");
    setSuccess("");

    // Basic validation
    if (!mode || !price) {
      setError("Please select a mode and enter a price.");
      return;
    }

    // Validate discountPercentage if provided
    if (discountPercentage !== "") {
      const discount = parseFloat(discountPercentage);
      if (isNaN(discount) || discount < 0 || discount > 100) {
        setError("Discount Percentage must be a number between 0 and 100.");
        return;
      }
    }

    const data = {
      mode,
      price: parseFloat(price),
      duration: duration ? parseInt(duration, 10) : undefined,
      discountPercentage:
        discountPercentage !== "" ? parseFloat(discountPercentage) : undefined,
      discountedPrice: discountedPrice ? parseFloat(discountedPrice) : undefined,
      features,
      title,
      subject_id: selectedSubject,
    };

    try {
      const response = await createTypeOfBatch(data);
      if (response) {
        setSuccess("Type of batch created successfully!");
        // Reset form
        setMode("");
        setPrice("");
        setDuration("");
        setDiscountPercentage("");
        setDiscountedPrice("");
        setFeatures([]);
        setFeatureInput("");
        setTitle("");
        setSelectedBoard("");
        setClassData([]);
        setSelectedClass("");
        setSubjectData([]);
        setSelectedSubject("");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(err.response?.data?.error || "Failed to create Type of Batch.");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Create Type of Batch (Using Ant Design Form)</h2>

      {/* Ant Design Form */}
      <AntdForm layout="vertical" onFinish={onFinish}>
        {/* Title */}
        <AntdForm.Item label="Batch Title" required>
          <AntdInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter batch title"
          />
        </AntdForm.Item>

        {/* Mode */}
        <AntdForm.Item label="Type of Batch" required>
          <AntdSelect
            value={mode}
            onChange={(val) => setMode(val)}
            placeholder="Select Mode"
          >
            <Option value="">Select Mode</Option>
            <Option value="1:1">1:1</Option>
            <Option value="1:3">1:3</Option>
            <Option value="1:5">1:5</Option>
            <Option value="1:7">1:7</Option>
          </AntdSelect>
        </AntdForm.Item>

        {/* Board */}
        <AntdForm.Item label="Select Board" required>
          <AntdSelect
            placeholder="Select Board"
            value={selectedBoard}
            onChange={(val) => {
              setSelectedBoard(val);
              setSelectedClass("");
              setSubjectData([]);
              setSelectedSubject("");
            }}
          >
            <Option value="">-- Select Board --</Option>
            {boardData.map((board) => (
              <Option key={board._id} value={board._id}>
                {board.name}
              </Option>
            ))}
          </AntdSelect>
        </AntdForm.Item>

        {/* Class */}
        <AntdForm.Item label="Select Class" required>
          <AntdSelect
            placeholder="Select Class"
            value={selectedClass}
            onChange={(val) => setSelectedClass(val)}
          >
            <Option value="">-- Select Class --</Option>
            {classData.map((classItem) => (
              <Option key={classItem._id} value={classItem._id}>
                {classItem.classLevel}
              </Option>
            ))}
          </AntdSelect>
        </AntdForm.Item>

        {/* Subject */}
        <AntdForm.Item label="Select Subject" required>
          <AntdSelect
            placeholder="Select Subject"
            value={selectedSubject}
            onChange={(val) => setSelectedSubject(val)}
          >
            <Option value="">-- Select Subject --</Option>
            {subjectData.map((subject) => (
              <Option key={subject._id} value={subject._id}>
                {subject.subject_name}
              </Option>
            ))}
          </AntdSelect>
        </AntdForm.Item>

        {/* Price */}
        <AntdForm.Item label="Price ($)" required>
          <AntdInput
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="0.01"
            placeholder="Enter price"
          />
        </AntdForm.Item>

        {/* Discount Percentage (optional) */}
        {/* <AntdForm.Item label="Discount Percentage (%)">
          <AntdInput
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            min="0"
            max="100"
            step="0.01"
            placeholder="Optional"
          />
        </AntdForm.Item>

        {discountedPrice && (
          <p style={{ color: "#666", marginBottom: 16 }}>
            Discounted Price: <strong>${discountedPrice}</strong>
          </p>
        )} */}

        {/* Duration (optional) */}
        {/* <AntdForm.Item label="Duration (days)">
          <AntdInput
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="0"
            step="1"
            placeholder="Optional duration in days"
          />
        </AntdForm.Item> */}

        {/* Features */}
        <AntdForm.Item label="Features">
          <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
            <AntdInput
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={handleFeatureKeyDown}
              placeholder="Enter a feature"
            />
            <AntdButton
              type="primary"
              onClick={handleAddFeature}
              disabled={!featureInput.trim() || features.length >= MAX_FEATURES}
            >
              <FaPlus /> Add
            </AntdButton>
          </div>
          {features.length >= MAX_FEATURES && (
            <Alert message={`You can only add up to ${MAX_FEATURES} features.`} type="warning" />
          )}
          {features.length > 0 && (
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {features.map((feature, index) => (
                <li key={index} style={{ marginBottom: "4px" }}>
                  {feature}{" "}
                  <AntdButton
                    danger
                    type="text"
                    icon={<FaTrash />}
                    onClick={() => handleRemoveFeature(feature)}
                  />
                </li>
              ))}
            </ul>
          )}
        </AntdForm.Item>

        {/* Error and Success Messages */}
        {error && <Alert style={{ marginBottom: 10 }} message={error} type="error" />}
        {success && <Alert style={{ marginBottom: 10 }} message={success} type="success" />}

        {/* Submit Button */}
        <AntdButton type="primary" htmlType="submit">
          Create
        </AntdButton>
      </AntdForm>
    </div>
  );
};

export default ModeBatch;
