import React, { useState, useEffect } from "react";
import { getAllStudents } from "../../../../api/studentApi";
import { getAllTeachers } from "../../../../api/teacherApi";
import { UserManagementWrap } from "./UserManagement.styles";
import { FaFilter, FaSearch } from "react-icons/fa";
import { Input, Select, Table } from "antd";
import Animation from "../../../admin/assets/Animation.json";
import Lottie from "lottie-react";
import { set } from "lodash";

const { Option } = Select;

export default function UserManagement() {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("students");
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (statusFilter === "students") {
        const studentData = await getAllStudents();
        setColumns([
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Email", dataIndex: "email", key: "email" },
          { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
          { title: "Class Level", dataIndex: "classLevel", key: "classLevel" },
        ]);
        if (studentData) {
          const formattedData = studentData.map((student) => ({
            key: student._id,
            name: student.user_id?.name || "N/A",
            email: student.user_id?.email || "N/A",
            phoneNumber: student.phone_number || "N/A",
            classLevel: student.class?.classLevel || "N/A",
          }));
          setOriginalData(formattedData);
          setData(formattedData);
        }
      } else if (statusFilter === "teachers") {
        const teacherData = await getAllTeachers();
        setColumns([
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Email", dataIndex: "email", key: "email" },
          { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
          { title: "Qualification", dataIndex: "qualification", key: "qualification" },
        ]);
        if (teacherData) {
          const formattedData = teacherData.teachers.map((teacher) => ({
            key: teacher._id,
            name: teacher.user_id?.name || "N/A",
            email: teacher.user_id?.email || "N/A",
            phoneNumber: teacher.phone_number || "N/A",
            qualification: teacher.qualifications || "N/A",
          }));
          setOriginalData(formattedData);
          setData(formattedData);
        }
      }
    };

    fetchData();
    setLoading(false);
  }, [statusFilter]);

  useEffect(() => {
    const filteredData = originalData.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );
    setData(filteredData);
  }, [searchInput, originalData]);


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
    <UserManagementWrap>
      <div className="area-row ar-one">
        <h2 className="UserManagement-batch_title">User Management</h2>
        <div className="UserManagement-controls">
          <Input
            className="UserManagement-search"
            placeholder={`Search by ${statusFilter === "students" ? "Student" : "Teacher"} Name`}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            // prefix={<FaSearch />}
          />
          <div className="UserManagement-filter">
            {/* <FaFilter className="UserManagement-filter-icon" /> */}
            <Select
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              className="UserManagement-dropdown"
            >
              <Option value="students">Students</Option>
              <Option value="teachers">Teachers</Option>
            </Select>
          </div>
        </div>
      </div>
      <div className="area-row ar-three">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          bordered
          rowKey={(record) => record.key}
        />
      </div>
    </UserManagementWrap>
  );
}
