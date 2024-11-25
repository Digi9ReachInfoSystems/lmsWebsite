// ManagePayment.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Button,
  Modal,
  Tag,
  Space,
  Input,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { getAllPaymentsApi } from "../../../../api/paymentsApi"; // Adjust the path as needed
import {
  Container,
  StyledButton,
  SecondaryButton,
  ErrorMessage,
  LoadingContainer,
  ModalContent,
} from "./ManagePayment.styles";

const ManagePayment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // For search functionality
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

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

  const getColumnSearchProps = (dataIndex, nested = false) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(
              e.target.value ? [e.target.value] : []
            )
          }
          onPressEnter={() =>
            handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys, confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{ color: filtered ? "#1890ff" : undefined }}
      />
    ),
    onFilter: (value, record) => {
      const recordValue = nested
        ? dataIndex
            .split(".")
            .reduce((acc, key) => acc && acc[key], record)
        : record[dataIndex];
      return recordValue
        ? recordValue
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "";
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={
            text ? text.toString() : ""
          }
        />
      ) : (
        text
      ),
  });

  const handleSearch = (
    selectedKeys,
    confirm,
    dataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Payment ID",
      dataIndex: "payment_id",
      key: "payment_id",
      ...getColumnSearchProps("payment_id"),
      sorter: (a, b) =>
        a.payment_id.localeCompare(b.payment_id),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Student Name",
      dataIndex: ["student_id", "user_id", "name"],
      key: "student_name",
      ...getColumnSearchProps(
        ["student_id", "user_id", "name"],
        true
      ),
      sorter: (a, b) =>
        a.student_id.user_id.name.localeCompare(
          b.student_id.user_id.name
        ),
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <span>{record.student_id.user_id.name}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: ["student_id", "user_id", "email"],
      key: "email",
      ...getColumnSearchProps(
        ["student_id", "user_id", "email"],
        true
      ),
      sorter: (a, b) =>
        a.student_id.user_id.email.localeCompare(
          b.student_id.user_id.email
        ),
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <span>{record.student_id.user_id.email}</span>
      ),
    },
    {
      title: "Package Name",
      dataIndex: ["package_id", "package_name"],
      key: "package_name",
      ...getColumnSearchProps(
        ["package_id", "package_name"],
        true
      ),
      sorter: (a, b) => {
        const nameA = a.package_id
          ? a.package_id.package_name
          : "";
        const nameB = b.package_id
          ? b.package_id.package_name
          : "";
        return nameA.localeCompare(nameB);
      },
      sortDirections: ["descend", "ascend"],
      render: (text, record) =>
        record.package_id
          ? record.package_id.package_name
          : "N/A",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ["descend", "ascend"],
      render: (text) => `${text} INR`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Created", value: "created" },
        { text: "Paid", value: "paid" },
      ],
      onFilter: (value, record) =>
        record.status.includes(value),
      render: (status) => {
        let color =
          status === "paid" ? "green" : "volcano";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      ...getColumnSearchProps("order_id"),
      sorter: (a, b) =>
        a.order_id.localeCompare(b.order_id),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Receipt",
      dataIndex: "receipt",
      key: "receipt",
      ...getColumnSearchProps("receipt"),
      sorter: (a, b) =>
        a.receipt.localeCompare(b.receipt),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
      sorter: (a, b) =>
        a.description.localeCompare(b.description),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) =>
        new Date(a.createdAt) - new Date(b.createdAt),
      sortDirections: ["descend", "ascend"],
      render: (text) =>
        new Date(text).toLocaleString(),
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

  return (
    <Container>
      <div className="header">
        <h2>Manage Payments</h2>
        {/* You can add action buttons here if needed */}
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Table
        columns={columns}
        dataSource={payments}
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
                {selectedPayment.student_id.user_id.name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {selectedPayment.student_id.user_id.email}
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
                    selectedPayment.status === "paid"
                      ? "green"
                      : "volcano"
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
                <strong>Description:</strong>{" "}
                {selectedPayment.description}
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
                  <img
                    src={selectedPayment.package_id.image}
                    alt="Package"
                  />
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
