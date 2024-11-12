import api from "../config/axiosConfig";

export const ManagePaymentData = async () => {
  try {
    const response = await api.get("/payment/");
    console.log("Payment fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching payment:",
      error.response?.data || error.message
    );
  }
};
