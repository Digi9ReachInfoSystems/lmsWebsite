import React, { useState, useEffect } from 'react'
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaSearch, FaFilter } from "react-icons/fa";
import { CustomerQueryWrap } from './CustomerQuery.styles';
import SearchBar from '../../components/SearchBar/SearchBar';
import DashboardTable from '../../components/DashboardTable/DashboardTable';
import { getAllQuerys } from '../../../../api/customerQueryApi';
import { Link } from 'react-router-dom';
import CustomerQueryViewForm from '../CustomerQueryViewForm/CustomerQueryViewForm';
import FormModel from '../../components/FormModel/FormModel';

export default function CustomerQuery2() {
    const [searchInput, setSearchInput] = useState();
    const [filterData, setFilterData] = React.useState();
    const [originalData, setOriginalData] = useState([]);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("pending");
    const [queryId, setQueryId] = useState();
    const columns = [
        "Title",
        "Description",
        "Date",
        "Status",

    ];
    const openModel = () => {
        setIsModelOpen(true);
    }
    const closeModel = () => {
        setIsModelOpen(false);
    }

    React.useEffect(() => {
        const apiCaller = async () => {
            const data = await getAllQuerys();
            const pendingQueries = data?.queries?.filter(
                (query) => query.queryStatus === statusFilter
            );
            console.log(pendingQueries);
            if (pendingQueries) {
                const dataFilter = pendingQueries.map((query) => {
                    return {
                        "Title": query.title || "N/A",
                        "Description": query.message || "N/A",
                        "Date": new Date(query.dateQueried).toLocaleDateString() || "N/A",
                        "Status":
                            <button className="customer-queries-link"
                                onClick={
                                    () => {
                                        setQueryId(query._id);
                                        openModel();
                                    }
                                }>

                                {query.queryStatus || "N/A"}

                            </button>

                    };
                });
                setOriginalData(dataFilter);
                setFilterData(dataFilter);
            }
        }
        apiCaller();
    }, [statusFilter]);

    // Filter data based on searchInput for "Batch Name"
    useEffect(() => {
        if (searchInput) {
            const filtered = originalData.filter((item) =>
                item["Title"].toLowerCase().includes(searchInput.toLowerCase())
            );
            setFilterData(filtered);
        } else {
            setFilterData(originalData); // Reset to original data if search is empty
        }
    }, [searchInput, originalData]);
    return (
        <CustomerQueryWrap className="content-area">
            <div>
                <div className="area-row ar-one">


                    <div className="CustomerQueries-batches_nav">
                        <h2 className="CustomerQueries-batch_title">Customer Queries</h2>
                        <div className="CustomerQueries-search">
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
                        <div className="CustomerQueries-filter">
                            <div className="CustomerQueries-filter-dropdown">
                                <FaFilter className="CustomerQueries-filter-icon" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="CustomerQueries-dropdown"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="solved">Solved</option>
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
                    {
                        isModelOpen
                            ? <FormModel isOpen={isModelOpen} onClose={closeModel} children={<CustomerQueryViewForm queryId={queryId} />} />
                            : null
                    }

                </div>
            </div>
        </CustomerQueryWrap>
    )
}
