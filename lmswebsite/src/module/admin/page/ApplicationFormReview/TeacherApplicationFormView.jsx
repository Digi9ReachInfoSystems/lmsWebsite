import React, { useEffect, useState } from 'react'
import { AiOutlineFileAdd } from 'react-icons/ai';
import DashboardTable from '../../components/DashboardTable/DashboardTable';
import SearchBar from '../../components/SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import { getTeacherApplications } from '../../../../api/teachersApplicationApi';
import { TeacherApplicationFormViewWrap } from './TeacherApplicationFormView.styles';
export default function TeacherApplicationFormView() {

    const [searchInput, setSearchInput] = useState();
    const [filterData, setFilterData] = React.useState();
    const [originalData, setOriginalData] = useState([]);
    const columns = [
        "Name",
        "Status",

    ];

    React.useEffect(() => {
        const apiCaller = async () => {
            const data = await getTeacherApplications("pending");
            console.log("Fetched Applications:", data);
            if (data) {
                const dataFilter = data.applications.map((teacher) => {
                    return {
                        "Name": teacher.teacher_id.name,
                        "Status": <Link to={`/admin/applicationFormReview/teacher/${teacher._id}`}  className="TeachersApplicationFormView-link">
                            {teacher.approval_status}
                        </Link>
                    };
                });
                setOriginalData(dataFilter);
                console.log(dataFilter);
                setFilterData(dataFilter);
            }
        }
        apiCaller();
    }, []);
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
                <div className="TeachersApplicationFormView-batchesNav">
                    <h2 className="TeachersApplicationFormView-batchTitle">Application Form</h2>
                </div>

            </div>
            <div className="area-row ar-two">
                <SearchBar setFilter={setSearchInput} />
            </div>
            <div className="area-row ar-three">
                {
                    filterData ?
                        <DashboardTable columns={columns} data={filterData} />
                        : <p>Loading...</p>
                }

            </div>

        </TeacherApplicationFormViewWrap>
    )
}
