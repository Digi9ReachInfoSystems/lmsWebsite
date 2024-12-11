import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getAllBatches } from "../../../../api/batchApi";
import CreateNewBatch from "../createNewBatch/CreateNewBatch";
import { Container } from "./CreatedBatches.styles";
import Animation from "../../../admin/assets/Animation.json";
import Lottie from "lottie-react";
const CreatedBatch = () => {
  const [batches, setBatches] = useState([]);
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
const [loading, setLoading] = useState(false);
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
        }));
        setBatches(formattedData);
        setFilteredBatches(formattedData);
        
    setLoading(false);
      } else {
        message.error("Unexpected data format from server.");
      }
    } catch (error) {
      console.error("Error fetching batches:", error);
      message.error("Failed to fetch batches.");
    }
  };

  useEffect(() => {
    fetchBatches();

  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);
    const filtered = batches.filter((batch) =>
      batch.batchName.toLowerCase().includes(value)
    );
    setFilteredBatches(filtered);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    fetchBatches(); // Refresh data after creating a new batch
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
            // Scale down the animation using transform
            transform: "scale(0.5)", 
            transformOrigin: "center center",
          }}
        >
          <Lottie
            animationData={Animation}
            loop={true}
          />
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
          <Button type="primary" style={{ background: "#EE1B7A", borderColor: "#EE1B7A" }} icon={<PlusOutlined />} onClick={openModal}>
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

<Modal
  title="Create New Batch"
  visible={isModalOpen}
  onCancel={closeModal}
  footer={null}
  centered
  destroyOnClose
  style={{backgroundColor: "none", marginRight:"15px"}}
>
  <CreateNewBatch open={isModalOpen} closeModal={closeModal} />
</Modal>
    </Container>
  );
};

export default CreatedBatch;
