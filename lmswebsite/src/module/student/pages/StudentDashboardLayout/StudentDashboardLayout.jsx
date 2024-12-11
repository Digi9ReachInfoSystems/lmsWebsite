// DashboardLayout.jsx
import React, { useState,useEffect } from "react";

import Sidebar from "../../components/Sidebar/Sidebar"; // Import your Sidebar
import Navbar from "../../components/Navbar/Navbar"; // Import your Navbar
import { Outlet,useNavigate ,useLocation} from "react-router-dom";
import { GlobalStyles } from "../../../../style/GlobalStyles/GlobalStyles";
import { getStudentByAuthId } from "../../../../api/studentApi";

const StudentDashboardLayout = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const location = useLocation(); // Detect route changes
  useEffect(() => {
    const apiCall = async () => {
      const sId= JSON.parse(localStorage.getItem("sessionData")).userId;
       const data= await getStudentByAuthId(sId);
       setStudentData(data);
       if ( studentData) {
        if(studentData.student.custom_package_status == "expired"&&studentData.student.is_paid==false){
          navigate("/student/package/expiryAlert")
        }
      }
       
    }
    apiCall();  
  },[location]);


  
  return (
    <div className="page-wrapper">
      <Sidebar />

      <div className="content-wrapper">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
