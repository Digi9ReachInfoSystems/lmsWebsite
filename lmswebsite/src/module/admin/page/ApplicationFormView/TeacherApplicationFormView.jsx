import React, { useEffect, useState } from 'react'
import { AiOutlineFileAdd } from 'react-icons/ai';
import { FaSearch } from "react-icons/fa";
import DashboardTable from '../../components/DashboardTable/DashboardTable';
import SearchBar from '../../components/SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import { getTeacherApplications } from '../../../../api/teachersApplicationApi';
import { TeacherApplicationFormViewWrap } from './TeacherApplicationFormView.styles';
import { FaFilter } from 'react-icons/fa'; // Font Awesome filter icon
import FormModel from '../../components/FormModel/FormModel';
import TeacherApplicationFormReview from '../TeachersApplicationFormReview/TeacherApplicationFormReview';

export default function TeacherApplicationFormView() {

    const [searchInput, setSearchInput] = useState();
    const [filterData, setFilterData] = React.useState();
    const [originalData, setOriginalData] = useState([]);
    const [statusFilter, setStatusFilter] = useState("pending");
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [teacherId, setTeacherId] = useState("");
    const openModel = () => {
        setIsModelOpen(true);
    }
    const closeModel = () => {
        setIsModelOpen(false);
        window.location.reload();
    }
    const columns = [
        "Name",
        "Email",
        "Date",
        "Status",

    ];

    React.useEffect(() => {
        const apiCaller = async () => {
            console.log("Calling API", statusFilter);
            const data = await getTeacherApplications(statusFilter);
            console.log("Fetched Applications:", data);
            if (data) {
                const dataFilter = data.applications.map((teacher) => {
                    console.log("Data", teacher.teacher_id.email);
                    return {
                        "Name": teacher.teacher_id.name,
                        "Email": teacher.teacher_id.email,
                        "Date": new Date(teacher.date_applied).toLocaleDateString(),
                        "Status":
                            <button  className="TeachersApplicationFormView-link"
                                onClick={
                                    () => {
                                        setTeacherId(teacher._id); 
                                        openModel();
                                    }
                                }>

                                {teacher.approval_status}

                            </button>
                    };
                });
                setOriginalData(dataFilter);
                console.log(dataFilter);
                setFilterData(dataFilter);
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
        <TeacherApplicationFormViewWrap className="content-area">
            <div className="area-row ar-one">

                <div className="TeachersApplicationFormView-batches_nav">
                    <h2 className="TeachersApplicationFormView-batch_title">Application Form</h2>
                    <div className="TeachersApplicationFormView-search">
                        <form>
                            <div className="input-group">
                                <span className="input-icon">
                                    <FaSearch />
                                </span>
                                <input
                                    type="text"
                                    className="input-control"
                                    placeholder="Search by Teacher Name"
                                    value={searchInput} // Controlled input
                                    onChange={(e) => setSearchInput(e.target.value)} // Update searchInput state on change
                                />
                            </div>
                        </form>
                    </div>
                    {/* filter */}
                    <div className="TeachersApplicationFormView-filter">
                        <div className="filter-dropdown">
                            <FaFilter className="filter-icon" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="TeachersApplicationFormView-dropdown"
                            >
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                                <option value="approved">Approved</option>
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
                }{
                    isModelOpen
                        ? <FormModel isOpen={isModelOpen} onClose={closeModel} children={<TeacherApplicationFormReview teacher_Id={teacherId}closeModal={closeModel} />} />
                        : null
                }

            </div>

        </TeacherApplicationFormViewWrap>
    )
}
