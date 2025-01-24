import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, message, Select, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { addStudentToBatch, getAllBatches } from "../../../../api/batchApi";
import { getAllStudents } from "../../../../api/studentApi"; // Ensure these API functions are correctly implemented
import CreateNewBatch from "../createNewBatch/CreateNewBatch";
import { Container } from "./CreatedBatches.styles";
import Animation from "../../../admin/assets/Animation.json";
import Lottie from "lottie-react";
import { getEligibleStudentsForBatch } from "../../../../api/studentApi";
import { getTypeOfBatchById } from "../../../../api/typeOfBatchApi";

const { Text } = Typography;
const { Option } = Select;

const CreatedBatch = () => {
  const [batches, setBatches] = useState([]);
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Add Student Modal states
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [students, setStudents] = useState([]);
  const [loadingAddStudent, setLoadingAddStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectionLength, setSelectionLength] = useState(0);
  const [remStudentCount, setRemStudentCount] = useState(0);
  const [selectedStudents, setSelectedStudents] = useState([]); // Changed to array
  const [seletedSubjectId, setSeletedSubjectId] = useState(null)

  // Fetch all batches
  const fetchBatches = async () => {
    try {
      setLoading(true);
      const data = await getAllBatches();
      if (data && Array.isArray(data.batches)) {
        const formattedData = data.batches.map((batch) => ({
          key: batch._id, // Ant Design requires a unique key for table rows
          batchName: batch.batch_name,
          teachers: batch.teacher_id.map((teacher) => teacher.user_id.name).join(", ") || "N/A",
          numOfStudents: batch.students ? batch.students.length : 0,
          date: new Date(batch.date).toLocaleDateString(),
          subject: batch.subject_id?.subject_name || "N/A",
          class: batch.class_id?.classLevel || "N/A",
          batchType: batch?.type_of_batch?.title || "N/A",
          type_of_batch_id: batch?.type_of_batch?._id,
          subject_id: batch.subject_id?._id
        }));
        setBatches(formattedData);
        setFilteredBatches(formattedData);
        setLoading(false);
      } else {
        message.error("Unexpected data format from server.");
        setLoading(false);
      }
    } catch (error) {
      //console.error("Error fetching batches:", error);
      message.error("Failed to fetch batches.");
      setLoading(false);
    }
  };

  // Fetch all students
  const fetchStudents = async (record) => {
    try {
      setLoadingAddStudent(true);
      //////console.log("record", record);


      const filterData = { subject_id: record.subject_id, type_of_batch: record.type_of_batch_id }
      const data = await getEligibleStudentsForBatch(filterData);
      //////console.log("data", data);
      if (data && Array.isArray(data.students)) {
        if (data.students.length === 0) {
          message.error("Batch is full.");
          setStudents([]);
        } else {
          const formattedStudents = data.students?.map((student) => ({
            label: student.user_id.name, // Adjust based on your student data structure
            value: student._id,

          }));
          setStudents(formattedStudents);
        }


      } else {
        message.error("Unexpected data format from server.");
      }
      setLoadingAddStudent(false);
    } catch (error) {
      //console.error("Error fetching students:", error);
      setStudents([]);
      message.error("Batch is full.");
      setLoadingAddStudent(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);
  const handleStudentAddCheck = (record) => {
    const apiCaller = async () => {
      try {
        ////console.log("calling api");
        const typeOfBatchData = await getTypeOfBatchById(record.type_of_batch_id);
        setSeletedSubjectId(record.subject_id)
        switch (typeOfBatchData.mode) {
          case "1:1":
            if (record.numOfStudents === 1) {
              setRemStudentCount(0);
            } else {
              setRemStudentCount(1 - record.numOfStudents);
            }
            setSelectionLength(1);
            ////console.log("selectionLength", 1);
            break;
          case "1:3":
            if (record.numOfStudents === 3) {
              setRemStudentCount(0);
            } else {
              setRemStudentCount(3 - record.numOfStudents);
            }
            setSelectionLength(3);
            ////console.log("selectionLength", 3);
            break;
          case "1:5":
            ////console.log("record.numOfStudents", record.numOfStudents);
            if (record.numOfStudents === 5) {
              setRemStudentCount(0);
            } else {
              setRemStudentCount(5 - record.numOfStudents);
            }
            setSelectionLength(5);
            ////console.log("selectionLength", 5);
            break;
          case "1:7":
            if (record.numOfStudents === 7) {
              setRemStudentCount(0);
            } else {
              setRemStudentCount(7 - record.numOfStudents);
            }
            setSelectionLength(7);
            ////console.log("selectionLength", 7);
            break;
          default:
            setSelectionLength(0);
            break;
        }
      } catch (error) {
        ////console.error("Error fetching students:", error);
      }
    }

    apiCaller();
  }

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);
    const filtered = batches.filter((batch) =>
      batch.batchName.toLowerCase().includes(value)
    );
    setFilteredBatches(filtered);
  };

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    fetchBatches(); // Refresh data after creating a new batch
  };

  const handleAddStudent = (batch) => {
    handleStudentAddCheck(batch);
    setSelectedBatch(batch);
    setIsAddStudentModalOpen(true);
    fetchStudents(batch); // Fetch students when modal opens
  };
  const handleStudentChange = (values) => {
    if (values.length > remStudentCount) {
      message.error(
        `You can only select up to ${remStudentCount} student${remStudentCount > 1 ? "s" : ""
        }.`
      );
      return;
    }
    setSelectedStudents(values);
  };

  const handleConfirmAddStudent = async () => {
    if (remStudentCount === 0) {
      message.error("The batch is already full.");
      return;
    }
    if (!selectedBatch || selectedStudents.length === 0) {
      message.error("Please select at least one student.");
      return;
    }
    if (selectedStudents.length > remStudentCount) {
      message.error(
        `You can only select up to ${remStudentCount} student${remStudentCount > 1 ? "s" : ""
        }.`
      );
      return;
    }
    try {
      setLoadingAddStudent(true);
      // Assuming addStudentToBatch can handle an array of student IDs
      const submissionData = {
        studentIds: selectedStudents,
        subjectId: seletedSubjectId
      }
      //////console.log("submissionData", submissionData);
      //////console.log("selectedBatch.key", selectedBatch.key);

      const response = await addStudentToBatch(
        selectedBatch.key,
        submissionData
      );
      if (response.batch) {
        message.success("Student(s) added to batch successfully.");
        setIsAddStudentModalOpen(false);
        setSelectedBatch(null);
        setSelectedStudents([]);
        fetchBatches(); // Refresh the batches list
      } else {
        message.error(response.message || "Failed to add student(s) to batch.");
      }
      setLoadingAddStudent(false);
    } catch (error) {
      ////console.error("Error adding student to batch:", error);
      message.error("Failed to add student(s) to batch.");
      setLoadingAddStudent(false);
    }

  };

  const columns = [
    {
      title: "Batch Name",
      dataIndex: "batchName",
      key: "batchName",
    },
    {
      title: "Teacher's Name",
      dataIndex: "teachers",
      key: "teachers",
    },
    {
      title: "No. of Students",
      dataIndex: "numOfStudents",
      key: "numOfStudents",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Batch Type",
      dataIndex: "batchType",
      key: "batchType",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="primary"  style={{ background: "#EE1B7A", borderColor: "#EE1B7A" }}onClick={() => handleAddStudent(record)}>
          Add Student
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "300px",
            height: "300px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: "scale(0.5)", // Scale down the animation using transform
            transformOrigin: "center center",
          }}
        >
          <Lottie animationData={Animation} loop={true} />
        </div>
      </div>
    );
  }

  return (
    <Container>
      <div className="header">
        <h2>Created Batches</h2>
        <div className="actions">
          <Input
            placeholder="Search by Batch Name"
            value={searchInput}
            onChange={handleSearch}
            allowClear
            style={{ width: 300 }}
          />
          <Button
            type="primary"
            style={{ background: "#EE1B7A", borderColor: "#EE1B7A" }}
            icon={<PlusOutlined />}
            onClick={openCreateModal}
          >
            Create Batch
          </Button>
        </div>
      </div>

      <Table
        dataSource={filteredBatches}
        columns={columns}
        bordered
        pagination={{ pageSize: 6 }}
      />

      {/* Create New Batch Modal */}
      <Modal
        title="Create New Batch"
        visible={isCreateModalOpen}
        onCancel={closeCreateModal}
        footer={null}
        centered
        destroyOnClose
        style={{ backgroundColor: "none", marginRight: "15px" }}
      >
        <CreateNewBatch open={isCreateModalOpen} closeModal={closeCreateModal} />
      </Modal>

      {/* Add Student Modal */}
      <Modal
        title={`Add Student to ${selectedBatch?.batchName}`}
        open={isAddStudentModalOpen}
        onCancel={() => {
          setIsAddStudentModalOpen(false)
          setSelectedBatch(null)
          setSelectedStudent(null)
          setSelectedStudents([])
          setRemStudentCount(0)
          setSelectionLength(0)
        }}
        footer={[
          <Button key="cancel" onClick={() => {
            setIsAddStudentModalOpen(false)
            setSelectedBatch(null)
            setSelectedStudent(null)
            setSelectedStudents([])
            setRemStudentCount(0)
            setSelectionLength(0)
          }}>
            Cancel
          </Button>,
          <Button
            key="add"
            type="primary"
            style={ (remStudentCount == 0 || selectedStudents.length == 0)?{}:{ background: "#EE1B7A", borderColor: "#EE1B7A" }}
            onClick={handleConfirmAddStudent}
            loading={loadingAddStudent}
            // disabled={!selectedStudent}
            disabled={
              remStudentCount == 0 || selectedStudents.length == 0
            }
          >
            Add Student
          </Button>,
        ]}
      >
        {selectedBatch && (
          <>
            {remStudentCount === 0 ? (
              <Text type="danger">The batch is full.</Text>
            ) : (
              <div style={{ marginBottom: 16 }}>
                <Text>
                  Select {remStudentCount > 1 ? `up to ${remStudentCount} students` : "a student"}:
                </Text>
                <Select
                  mode="multiple"
                  showSearch
                  placeholder={`Select ${remStudentCount > 1
                    ? `up to ${remStudentCount} students`
                    : "a student"
                    }`}
                  optionFilterProp="children"
                  onChange={handleStudentChange}
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                  options={students}
                  style={{ width: "100%", marginTop: 8 }}
                  loading={loadingAddStudent}
                />
              </div>
            )}
          </>
        )}
      </Modal>
    </Container>
  );
};

export default CreatedBatch;
