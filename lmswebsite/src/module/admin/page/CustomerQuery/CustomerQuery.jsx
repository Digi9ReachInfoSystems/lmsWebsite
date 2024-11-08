import React, { useState, useEffect } from 'react'
import { AiOutlineFileAdd } from "react-icons/ai";
import { CustomerQueryWrap } from './CustomerQuery.styles';
import SearchBar from '../../components/SearchBar/SearchBar';
import DashboardTable from '../../components/DashboardTable/DashboardTable';
import { getAllQuerys } from '../../../../api/customerQueryApi';
import { Link } from 'react-router-dom';

export default function CustomerQuery2() {
    const [searchInput, setSearchInput] = useState();
    const [filterData, setFilterData] = React.useState();
    const [originalData, setOriginalData] = useState([]);
    const columns = [
        "Title",
        "Description",
        "Status",

    ];

    React.useEffect(() => {
        const apiCaller = async () => {
            const data = await getAllQuerys();
            const pendingQueries = data?.queries?.filter(
                (query) => query.queryStatus === "pending"
            );
            console.log(pendingQueries);
            if (pendingQueries) {
                const dataFilter = pendingQueries.map((query) => {
                    return {
                        "Title": query.title || "N/A",
                        "Description": query.message || "N/A",
                        "Status": <Link to={`/admin/customerQueries/${query._id}`} className="CustomerQuery-link">
                            {query.queryStatus || "N/A"}
                        </Link>,
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
        <CustomerQueryWrap className="content-area">
            <div>
                <div className="area-row ar-one">
                    <div className="CustomerQuery-batchesNav">
                        <h2 className="CustomerQuery-batchTitle">Customer Queries</h2>
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
            </div>
        </CustomerQueryWrap>
    )
}
