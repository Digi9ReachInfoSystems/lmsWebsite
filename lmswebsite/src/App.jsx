import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme/theme"; // Import your theme
import { GlobalStyles } from "./style/GlobalStyles/GlobalStyles"; // Import your global styles
import DashboardLayout from "./module/admin/page/DashboardLayout/DashboardLayout";
import Dashboard from "./module/admin/page/Dashboard/DashboardScreen";
import One from "./module/admin/page/One/One";
import CreatedBatch from "./module/admin/page/Created_Batches/CreatedBatch";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./module/admin/components/ProtectedRoute";
import CreateNewBatch from "./module/admin/page/createNewBatch/CreateNewBatch";
// import ApplicationFormReview from "./module/admin/page/ApplicationFormReview/ApplicationFormReview";
import TeacherApplicationFormView from "./module/admin/page/ApplicationFormReview/TeacherApplicationFormView";
import TeacherApplicationFormReview from "./module/admin/page/TeachersApplicationFormReview/TeacherApplicationFormReview";
import RegisteredList from "./module/admin/page/RegisteredList/RegisteredList";
import Circulars from "./module/admin/page/Circular/Circulars";
import CreateCircular from "./module/admin/page/CreateCircular/CreateCircular";
import CustomerQuery from "./module/admin/page/CustomerQuery/CustomerQuery";
import CustomerQueryFormView from "./module/admin/page/CustomerQueryViewForm/CustomerQueryViewForm";
import BecomeTeacherApplicationForm from "./module/teacher/pages/BecomeTeacherApplicationForm/BecomeTeacherApplicationForm";
import LandingPage from "./components/common/LandingPage";
import { Public } from "@mui/icons-material";
import PublicRoute from "./module/admin/components/PublicRoute";
// import PublicRoute from "./module/admin/components/PublicRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyles />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
            key=""
          ></Route>

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route path="/teacher" element={<BecomeTeacherApplicationForm />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/admin/one" element={<One />} />
            <Route path="/admin/createdBatches" element={<CreatedBatch />} />
            <Route path="/admin/createNewBatch" element={<CreateNewBatch />} />
            <Route
              path="/admin/applicationFormReview"
              element={<TeacherApplicationFormView />}
            />
            <Route
              path="/admin/applicationFormReview/teacher/:teacherId"
              element={<TeacherApplicationFormReview />}
            />
            <Route path="/admin/registeredList" element={<RegisteredList />} />
            <Route path="/admin/circular" element={<Circulars />} />
            <Route path="/admin/createcircular" element={<CreateCircular />} />
            <Route path="/admin/customerQueries" element={<CustomerQuery />} />
            <Route
              path="/admin/customerQueries/:queryId"
              element={<CustomerQueryFormView />}
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
