import React, { useState, useEffect } from "react";
import { getStudentByAuthId } from "../../../../api/studentApi";
import { useNavigate } from "react-router-dom";
// import "./PaymentScreen.css";
import HeaderSection from "../../../../Main/Pages/NavBar/navbar";
import PaymentComponent from "../../components/PaymentComponent/PaymentComponet";

const PaymentScreen = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState({ name: "", email: "" });
    const [totalPrice, setTotalPrice] = useState("500"); // Default total price
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const authId = JSON.parse(localStorage.getItem("sessionData")).userId;
                const response = await getStudentByAuthId(authId);
            //    console.log("response", response);
                setStudent(response.student); // Populate student details
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchStudent();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleProceedPayment = () => {
        console.log("Payment Details:", { studentName: student.user_id.name, totalPrice:student.amount });
        // Add payment logic here
        navigate("/dashboard"); // Navigate to the dashboard after proceeding
    };

    return (
        <div>
        <HeaderSection />
        <div className="board-container">
           <div className="header">
                <h2>Payment</h2>
            </div>

            {/* Student Name Display */}
            <div className="info-group">
                <label>Student Name:</label>
                <p>{student.user_id?.name}</p> {/* Display the student's name */}
            </div>

            {/* Total Price Display */}
            <div className="info-group">
                <label>Total Price:</label>
                <p>{student.amount} Rs </p> {/* Display the total price */}
            </div>

            {/* Proceed Button */}
            <PaymentComponent studentId={student._id} amount={student.amount}  />
            {/* <button onClick={handleProceedPayment} className="proceed-btn">
                Proceed to Payment
            </button> */}
        </div>
        </div>
    );
};

export default PaymentScreen;
