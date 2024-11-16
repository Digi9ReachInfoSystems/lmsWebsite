import React from "react";
import { ManagePaymentWrap } from "./managePayment.styles";
import DashboardTable from "../../components/DashboardTable/DashboardTable";

const columns = [
  "Payment ID",
  "User Name",
  "User Id",
  "Payment Method",
  "Completed",
  "Status",
  "Class",
  "Package_id",
];

const ManagePayment = () => {
  return (
    <ManagePaymentWrap>
      <DashboardTable columns={columns} />
    </ManagePaymentWrap>
  );
};

export default ManagePayment;
