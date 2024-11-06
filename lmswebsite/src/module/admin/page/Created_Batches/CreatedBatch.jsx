// src/components/CreatedBatch.jsx

import React, { useState, useEffect } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { PiFunnel } from "react-icons/pi";
import { getAllBatches } from "../../../../api/batchApi"; // Adjust the path if needed

import { Link } from "react-router-dom";
import { CreatedBatchWrap } from "./CreatedBatches.styles";
import SearchBar from "../../components/SearchBar/SearchBar";
import DashboardTable from "../../components/DashboardTable/DashboardTable";
import { getAllBatchesNoFilter } from "../../../../api/batchApi";


export default function CreatedBatch() {
    const [searchInput, setSearchInput] = useState();
    const [filterData, setFilterData] = React.useState();
    const [originalData, setOriginalData] = useState([]);
    const columns = [
        "Batch Name",
        "Teacher's Name",
        "No of Students",
        "No of Classes",
        "Date",
        "Time",
    ];

    React.useEffect(() => {
        const apiCaller = async () => {
            const data = await getAllBatchesNoFilter();
            if (data) {
                const dataFilter = data.data.map((batch) => {
                    return {
                        "Batch Name": batch.batch_name,
                        "Teacher's Name": batch.teacher_id?.name || "N/A",
                        "No of Students": batch.students.length,
                        "No of Classes": batch.no_of_classes,
                        "Date": new Date(batch.start_date).toLocaleDateString(),
                        "Time": new Date(batch.date).toLocaleTimeString(),
                    };
                });
                setOriginalData(dataFilter);
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
        <CreatedBatchWrap className="content-area">
            <div className="area-row ar-one">
                <div className="created-batch-batches_nav">
                    <h2 className="created-batch-batch_title">Created Batches</h2>
                    <Link to="/admin/createNewBatch" className="created-batch-batch_btn">
                        <AiOutlineFileAdd className="created-batch-batch_icon" />
                        <span>Create Batch</span>
                    </Link>
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

        </CreatedBatchWrap>
    )
}
