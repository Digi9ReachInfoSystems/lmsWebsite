// src/PaymentSettings/PaymentSettings.jsx
import React from "react";
import {
  Container,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  ExportButton,
} from "./PaymentSettings.style";

const paymentHistory = [
  {
    batch: "Student 1",
    payment: "299/-",
    date: "30/10/2024",
    status: "Confirmed",
  },
  {
    batch: "Student 1",
    payment: "299/-",
    date: "30/10/2024",
    status: "Confirmed",
  },
  {
    batch: "Student 1",
    payment: "299/-",
    date: "30/10/2024",
    status: "Confirmed",
  },
  {
    batch: "Student 1",
    payment: "299/-",
    date: "30/10/2024",
    status: "Confirmed",
  },
];

const PaymentSettings = () => {
  return (
    <Container>
      <h2>Payment History</h2>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Batch</TableHeader>
            <TableHeader>Payment</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {paymentHistory.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.batch}</TableCell>
              <TableCell>{entry.payment}</TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.status}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <ExportButton>Export History</ExportButton>
    </Container>
  );
};

export default PaymentSettings;
