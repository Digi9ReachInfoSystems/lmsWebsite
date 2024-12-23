import React, { useEffect, useState } from "react";
import { getBatchesByTeacherId } from "../../../../api/batchApi";
import { getTeacherByAuthId } from "../../../../api/teacherApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    StyledDashboard,
    ErrorMessage,
    MainCardContainer,
    CardContainer,
    CardOne,
    CardTitle,
    CardContent,
    CardDetail,
    CardImage,
    ViewAllButton,
} from "./DashboardBatches.style";
import { Table, Input, Button, Space, Row, Col, Card } from "antd";

const DashboardBatches = () => {
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [teacher, setTeacher] = useState(null);
    const [error, setError] = useState(null);
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const sessionData = JSON.parse(localStorage.getItem("sessionData"));
                if (!sessionData || !sessionData.userId) {
                    throw new Error("User is not authenticated.");
                }

                const teacherId = sessionData.userId;
                const teacherData = await getTeacherByAuthId(teacherId);
                console.log("Teacher Data:", teacherData);
                setTeacher(teacherData.teacher);

                // Fetch batches and limit to 4
                const allBatches = await getBatchesByTeacherId(teacherData.teacher._id);
                console.log("Batches fetched successfully:", allBatches);
                setBatches(allBatches.slice(0, 4));

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setError(error.message || "An error occurred while loading data.");
                setLoading(false);
            }
        };

        fetchBatches();
    }, []);

    const handlaviewAllBatches = () => {
        Navigate(`/teacher/dashboard/quizz/assignedBatch`);
    };

    return (
        <StyledDashboard>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <Col span={24} style={{ textAlign: "center" }}>
                    <Card style={{ width: "80%", backgroundColor: "#a0f2e3" }}>
                        <h3>No Batches has been assigned to your Profile yet!</h3>
                    </Card>
                </Col>
            ) : (
                <MainCardContainer>
                    <h2>Teacher's Dashboard</h2>
                    <CardContainer>

                        {batches.map((batch, index) => (

                            <CardOne key={batch.id || index}>
                                <Link to={`/teacher/dashboard/quizz/assignedBatch`} >
                                    <CardImage
                                        src={batch.batch_image || "https://via.placeholder.com/400x300?text=No+Image"}
                                        alt={batch.batch_name}
                                    />
                                    <CardTitle>{batch.batch_name || "N/A"}</CardTitle>
                                    <CardContent>
                                        <CardDetail>
                                            <p>Subject:{batch?.subject_id?.subject_name || "N/A"}</p>
                                        </CardDetail>
                                        <CardDetail>
                                            <p>Class:{batch?.class_id?.classLevel || "N/A"}</p>
                                        </CardDetail>
                                    </CardContent>
                                </Link>
                            </CardOne>
                        ))}

                    </CardContainer>
                    <ViewAllButton onClick={handlaviewAllBatches}>
                        View All
                    </ViewAllButton>
                </MainCardContainer>
            )}
        </StyledDashboard>
    );
};

export default DashboardBatches;
