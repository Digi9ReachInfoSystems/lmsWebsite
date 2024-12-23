import React, { useEffect } from "react";
import { Table, Button, Typography } from "antd";
import { Heading, PageContainer, PrimaryButton, Subheading } from "../../../../../style/PrimaryStyles/PrimaryStyles";
import { getPaymentByStudentId } from "../../../../../api/paymentsApi";
import { getStudentByAuthId } from "../../../../../api/studentApi";

const { Title } = Typography;

const paymentHistory = [
  {
    key: "1",
    batch: "Student 1",
    payment: "12299/-",
    date: "30/10/2024",
    status: "Confirmed",
  },
  {
    key: "2",
    batch: "Student 2",
    payment: "499/-",
    date: "29/10/2024",
    status: "Pending",
  },
  {
    key: "3",
    batch: "Student 3",
    payment: "299/-",
    date: "28/10/2024",
    status: "Confirmed",
  },
  {
    key: "4",
    batch: "Student 4",
    payment: "299/-",
    date: "27/10/2024",
    status: "Confirmed",
  },
];


const StudentPaymentSettings = () => {
  const [paymentData, setPaymentData] = React.useState([]);
  useEffect(() => {
    const apiCaller = async () => {
      const authId = JSON.parse(localStorage.getItem("sessionData")).userId;
      const studentData = await getStudentByAuthId(authId);
      const data = await getPaymentByStudentId(studentData.student._id);
      console.log(data);
      setPaymentData(data.payments);
    };
    apiCaller();
  }, []);
  const columns = [
    {
      title: "Payment ID",
      dataIndex: "payment_id",
      key: "payment_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Receipt",
      dataIndex: "receipt",
      key: "receipt",
    },
    {
      title: "Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => {
        // if (text == null) {
        //     return <span>00:00.00</span>;
        // } else {
        const date = new Date(text);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        // const formattedTime = date.toLocaleTimeString("en-US", {
        //     hour: "2-digit",
        //     minute: "2-digit",
        // });
        return <span>{formattedDate} </span>;
        // }
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          style={{
            color: status === "paid" ? "green" : "orange",
            fontWeight: "bold",
          }}
        >
          {status}
        </span>
      ),
    },
  ];

  const handleExport = () => {
    console.log("Exporting payment history...");
    // Add export functionality here
  };

  return (

    <PageContainer>
      <Subheading>Payment History</Subheading>
      <Table
        dataSource={paymentData}
        columns={columns}
        pagination={{ pageSize: 5 }}
        bordered
        style={{ marginTop: "16px" }}
      />
      {/* <PrimaryButton
       type="primary" 
       style={{ marginTop: "16px", backgroundColor: "#f52754", borderColor: "#f52754" , 
       
       } }
       onClick={handleExport}
     >
       Export History
     </PrimaryButton> */}
    </PageContainer>
  );
};

export default StudentPaymentSettings;
