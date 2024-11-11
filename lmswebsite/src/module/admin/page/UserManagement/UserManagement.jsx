import React,{useState, useEffect} from 'react';
import { getAllStudents } from "../../../../api/studentApi";
import { getAllTeachers } from "../../../../api/teacherApi";
import { UserManagementWrap } from './UserManagement.styles';
import { FaFilter } from 'react-icons/fa'; // Font Awesome filter icon
import SearchBar from '../../components/SearchBar/SearchBar';
import DashboardTable from '../../components/DashboardTable/DashboardTable';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function UserManagement() {


    const [searchInput, setSearchInput] = useState();
    const [filterData, setFilterData] = React.useState();
    const [originalData, setOriginalData] = useState([]);
    const [statusFilter, setStatusFilter] = useState("students");
    const [teacherId, setTeacherId] = useState("");
    const  [columns, setColumns] = useState([]);


    React.useEffect(() => {
        const apiCaller = async () => {
            if(statusFilter === "students"){
                setColumns(["Name", "Email", "Phone Number", "Class Level"]);
                const studentData = await getAllStudents();
                console.log(studentData);
                if(studentData){    
                   
                    const dataFilter = studentData.map((student) => {
                        return {
                            "Name": student.user_id.name||"N/A",
                            "Email": student.user_id.email||"N/A",
                            "Phone Number": student.phone_number||"N/A",
                            "Class Level":student.ClassLevel||"N/A",
                               
                        };
                    })
                    setOriginalData(dataFilter);
                    setFilterData(dataFilter);
                }
               
                
            }else if(statusFilter === "teachers"){
                setColumns(["Name", "Email", "Phone Number", "Qualification"]);
                const teacherData = await getAllTeachers();
                
                if(teacherData){    
                    const dataFilter = teacherData.teachers.map((teacher) => {
                        return {
                            "Name": teacher.user_id.name||"N/A",
                            "Email": teacher.user_id.email||"N/A",
                            "Phone Number": teacher.phone_number||"N/A",
                            "Qualification":teacher.qualifications||"N/A",
                               
                        };
                    })
                    setOriginalData(dataFilter);
                    setFilterData(dataFilter);
                }
                
            }
        }
        apiCaller();
    }, [statusFilter]);
    useEffect(() => {
        if (searchInput) {
            const filtered = originalData.filter((item) =>
                Object.values(item).some((value) =>
                    value.toString().toLowerCase().includes(searchInput.toLowerCase())
                )
            );
            setFilterData(filtered);
        } else {
            setFilterData(originalData);
        }
    }, [searchInput, originalData]);


    return (
        <UserManagementWrap className="content-area">
            <div className="area-row ar-one">

                <div className="UserManagement-batches_nav">
                    <h2 className="UserManagement-batch_title">User Management</h2>
                    <div className="UserManagement-search">
                        <form>
                            <div className="input-group">
                                <span className="input-icon">
                                    <FaSearch />
                                </span>
                                <input
                                    type="text"
                                    className="input-control"
                                    placeholder={statusFilter === "students" ? "Search by Student Name" : "Search by Teacher Name"}
                                    value={searchInput} // Controlled input
                                    onChange={(e) => setSearchInput(e.target.value)} // Update searchInput state on change
                                />
                            </div>
                        </form>
                    </div>
                    {/* filter */}
                    <div className="UserManagement-filter">
                        <div className="UserManagement-filter-dropdown">
                            <FaFilter className="UserManagement-filter-icon" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="UserManagement-dropdown"
                            >
                                <option value="students">Students</option>
                                <option value="teachers">Teachers</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
            <div className="area-row ar-two">
            </div>
            <div className="area-row ar-three">
                {
                    filterData ?
                        <DashboardTable columns={columns} data={filterData} />
                        : <p>Loading...</p>
                }

            </div>

        </UserManagementWrap>
    )
}
