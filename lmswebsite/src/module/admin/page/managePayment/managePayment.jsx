// ManagePayment.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { Table, Button, Modal, Tag, Space, Input, Tooltip } from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { getAllPaymentsApi } from "../../../../api/paymentsApi"; // Adjust the path as needed
import {
  Container,
  StyledButton,
  SecondaryButton,
  ErrorMessage,
  LoadingContainer,
  ModalContent,
} from "./managePayment.styles";
import Animation from "../../../admin/assets/Animation.json";
import Lottie from "lottie-react";
const ManagePayment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState(""); // Search term state
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const data = await getAllPaymentsApi();
        setPayments(data);
      } catch (err) {
        setError(
          err.response?.data?.error ||
            "Failed to fetch payments. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  // Filter payments dynamically based on search input
  const filteredPayments = payments.filter((payment) =>
    payment.student_id?.user_id?.email.toLowerCase().includes(searchInput)
  );

  const columns = [
    {
      title: "Payment ID",
      dataIndex: "payment_id",
    },
    {
      title: "Student Name",
      dataIndex: ["student_id", "user_id", "name"],
      key: "student_name",
      render: (text, record) => <span>{record.student_id.user_id.name}</span>,
    },
    {
      title: "Class",
      dataIndex: ["student_id", "class", "className"],
      key: "className",
      render: (text, record) => (
        <span>{record.student_id.class?.className}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: ["student_id", "user_id", "email"],
      key: "email",
      render: (text, record) => <span>{record.student_id.user_id.email}</span>,
    },
    {
      title: "Type of Batch",
      dataIndex: ["student_id", "type_of_batch"],
      key: "typeOfBatch",
      render: (_, record) => record.student_id.type_of_batch?.mode || "N/A",
    },
    {
      title: "Board",
      dataIndex: ["student_id", "board_id"],
      key: "board",
      render: (_, record) => record.student_id.board_id?.name || "N/A",
    },
    {
      title: "Subjects",
      dataIndex: ["student_id", "subject_id"], // Adjust to point to the correct data path
      key: "subjects",
      render: (_, record) => {
        const subjects = record.student_id?.subject_id || [];
        return subjects.length > 0
          ? subjects
              .map((subject) => subject._id?.subject_name || "N/A")
              .join(", ")
          : "N/A";
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => `${text} INR`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "paid" ? "green" : "volcano";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View Details">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => showDetails(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showDetails = (payment) => {
    setSelectedPayment(payment);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedPayment(null);
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
            // Scale down the animation using transform
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
    <Container>
      <div className="header">
        <h2>Manage Payments</h2>
        <div className="ManagePayments-search">
          <Input
            prefix={<FaSearch />}
            placeholder="Search by Email"
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Table
        columns={columns}
        dataSource={filteredPayments} // Use filtered data here
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
      />

      <Modal
        title="Payment Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedPayment ? (
          <ModalContent>
            <div className="details">
              <p>
                <strong>Payment ID:</strong> {selectedPayment.payment_id}
              </p>
              <p>
                <strong>Student Name:</strong>{" "}
                {selectedPayment.student_id?.user_id?.name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {selectedPayment.student_id?.user_id?.email}
              </p>
              <p>
                <strong>Package Name:</strong>{" "}
                {selectedPayment.package_id
                  ? selectedPayment.package_id.package_name
                  : "N/A"}
              </p>
              <p>
                <strong>Amount:</strong> {selectedPayment.amount} INR
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <Tag
                  color={
                    selectedPayment.status === "paid" ? "green" : "volcano"
                  }
                >
                  {selectedPayment.status.toUpperCase()}
                </Tag>
              </p>
              <p>
                <strong>Order ID:</strong> {selectedPayment.order_id}
              </p>
              <p>
                <strong>Receipt:</strong> {selectedPayment.receipt}
              </p>
              <p>
                <strong>Description:</strong> {selectedPayment.description}
              </p>{" "}
              <p>
                <strong>Class</strong>{" "}
                {selectedPayment.student_id.class?.className}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedPayment.createdAt).toLocaleString()}
              </p>
              {selectedPayment.razorpay_signature && (
                <p>
                  <strong>Razorpay Signature:</strong>{" "}
                  {selectedPayment.razorpay_signature}
                </p>
              )}
              <div className="image-container">
                <img
                  src={selectedPayment.student_id.profile_image}
                  alt="Student Profile"
                />
                {selectedPayment.package_id && (
                  <img src={selectedPayment.package_id.image} alt="Package" />
                )}
              </div>
            </div>
          </ModalContent>
        ) : (
          <LoadingContainer>Loading...</LoadingContainer>
        )}
      </Modal>
    </Container>
  );
};

export default ManagePayment;
