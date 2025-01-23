import React, { useState, useEffect } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { getAllCircularNotificationsApi } from "../../../../api/circularNotificationApi";
import { Button, Input, Modal, Table, Select } from "antd";
import { CircularWrap } from "./Circulars.styles";
import CreateCircular from "../CreateCircular/CreateCircular";
import Animation from "../../../admin/assets/Animation.json";
import Lottie from "lottie-react";

const { Option } = Select;

export default function Circulars() {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCreateCircularModalOpen, setIsCreateCircularModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (src) => (
        <img
          src={src}
          alt="Circular"
          className="circular-image-box"
          onClick={() => {
            setSelectedImage(src);
            setIsModalOpen(true);
          }}
          style={{ width: "50px", cursor: "pointer" }}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button
          type="text"
          onClick={() => {
            setSelectedImage(record.image);
            setIsModalOpen(true);
          }}
        >
          View Image
        </Button>
      ),
    },
  ];

  // Fetch data on component mount or filter change
  useEffect(() => {
    const fetchCirculars = async () => {
      setLoading(true);
      try {
        const data = await getAllCircularNotificationsApi(filter);
        if (data) {
          const formattedData = data.circularNotifications.map((circular) => ({
            key: circular._id,
            title: circular.circularName || "N/A",
            description: circular.content || "N/A",
            image: circular.image || "",
            userType: circular.role || "all",
          }));
          setOriginalData(formattedData);
          setData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching circulars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCirculars();
  }, [filter,isCreateCircularModalOpen]);

  // Filter data based on search input and selected filter
  useEffect(() => {
    let filteredData = originalData.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    if (filter !== "all") {
      filteredData = filteredData.filter((item) => item.userType === filter);
    }
    setData(filteredData);
  }, [searchInput, originalData, filter]);

  const openCreateCircularModal = () => {
    setIsCreateCircularModalOpen(true);
  };

  const closeCreateCircularModal = () => {
    setIsCreateCircularModalOpen(false);
  };

  const addCircularToList = (newCircular) => {
    const formattedCircular = {
      key: newCircular._id,
      title: newCircular.circularName || "N/A",
      description: newCircular.content || "N/A",
      image: newCircular.image || "",
      userType: newCircular.role || "all",
    };
    setOriginalData([formattedCircular, ...originalData]);
    setData([formattedCircular, ...data]);
  };

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
            transform: "scale(0.5)",
            transformOrigin: "center center",
          }}
        >
          <Lottie animationData={Animation} loop={true} />
        </div>
      </div>
    );
  }

  return (
    <CircularWrap>
      <div className="circular-header">
        <h2 className="circular-title">Created Circulars</h2>
        <div className="circular-button">
          <Input
            placeholder="Search by Circular Name"
            prefix={<FaSearch />}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{ width: "300px", marginRight: "20px" }}
          />
          <Select
            value={filter}
            onChange={(value) => setFilter(value)}
            style={{ width: 150, marginRight: "20px" }}
          >
            <Option value="all">All</Option>
            <Option value="teacher">Teacher</Option>
            <Option value="student">Student</Option>
          </Select>
          <Button
            type="primary"
            style={{ background: "#EE1B7A", borderColor: "#EE1B7A" }}
            icon={<AiOutlineFileAdd />}
            onClick={openCreateCircularModal}
          >
            Create Circular
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} bordered />

      <Modal
        visible={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        centered
      >
        <img
          src={selectedImage}
          alt="Circular"
          style={{ width: "100%", maxHeight: "500px" }}
        />
      </Modal>

      <Modal
        visible={isCreateCircularModalOpen}
        footer={null}
        onCancel={closeCreateCircularModal}
        centered
      >
        <CreateCircular closeModal={closeCreateCircularModal} addCircularToList={addCircularToList} />
      </Modal>
    </CircularWrap>
  );
}
