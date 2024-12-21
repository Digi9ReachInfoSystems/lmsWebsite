import React, { useEffect, useState } from 'react';
import {
    Table,
    Spin,
    Alert,
    Button,
    Input,
    message,
} from "antd";
import { getTeacherAttendance } from '../../../../api/teacherApi';
import { getTeacherByAuthId } from '../../../../api/teacherApi';
import { BodyText, Heading} from '../../../../style/PrimaryStyles/PrimaryStyles';
import { TeacherAttendanceWrap } from './TeacherAttendance.styles';
import Animation from "../../../teacher/assets/Animation.json";
import Lottie from "lottie-react";
export const TeacherAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [filteredAttendance, setFilteredAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // State to manage search term

    useEffect(() => {
        const apiCaller = async () => {
            try {
                setLoading(true);
                const authId = JSON.parse(localStorage.getItem("sessionData")).userId;
                const response = await getTeacherByAuthId(authId);
                const attendanceData = await getTeacherAttendance(response.teacher._id);
                console.log("Attendance Data:", attendanceData);
                setAttendance(attendanceData.attendance);
                setFilteredAttendance(attendanceData.attendance); // Initialize filteredAttendance with all data
            } catch (error) {
                setError(error.message || "Failed to fetch attendance.");
            } finally {
                setLoading(false);
            }
        };

        apiCaller();
    }, []);

    // Handle search
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        console.log(value);
        if (value === '') {
            setSearchTerm(null);
            setFilteredAttendance(attendance);

        }
        else {

            // Filter the attendance by meeting title based on search term
            const filteredData = attendance.filter((item) =>
                item?.meeting_title?.toLowerCase()?.includes(value.toLowerCase())
            );
            setFilteredAttendance(filteredData); // Update filtered data
        }


    };

    const columns = [
        {
            title: "Sl No.",
            dataIndex: "index",
            key: "index",
            render: (text, record, index) => <BodyText>{index + 1}</BodyText>,
        },
        {
            title: "Meeting Name",
            dataIndex: "meeting_title",
            key: "meeting_title",
            render: (text) => <BodyText>{text}</BodyText>,
        },
        {
            title: "Clock-In Time",
            dataIndex: "clock_in_time",
            key: "clock_in_time",
            render: (text) => {
                if (text == null) {
                    return <BodyText>00:00.00</BodyText>;
                } else {
                    const date = new Date(text);
                    const formattedDate = date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    });
                    const formattedTime = date.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                    });
                    return <BodyText>{formattedDate} {formattedTime}</BodyText>;
                }
            },
        },
        {
            title: "Clock-Out Time",
            dataIndex: "clock_out_time",
            key: "clock_out_time",
            render: (text) => {
                if (text == null) {
                    return <BodyText>00:00.00</BodyText>;
                } else {
                    const date = new Date(text);
                    const formattedDate = date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    });
                    const formattedTime = date.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                    });
                    return <BodyText>{formattedDate} {formattedTime}</BodyText>;
                }

            },
        },
    ];

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
            <TeacherAttendanceWrap>
                <div className='TeacherAttendance-heading-row'>
                   <Heading>Attendance List </Heading>
                    {/* Search Field */}
                    <Input
                        placeholder="Search by meeting name"
                        value={searchTerm}
                        onChange={handleSearch}
                        style={{ width: 300 }}
                    />
                </div>

                {loading ? (
                    <Lottie animationData={Animation} loop={true} />
                ) : error ? (
                    <Alert message={error} type="error" />
                ) : (
                    <Table
                        columns={columns}
                        dataSource={filteredAttendance} // Bind the filtered data to the table
                        rowKey="_id"
                        pagination={true} // You can add pagination if needed
                    />
                )}
            </TeacherAttendanceWrap>
    );
};
