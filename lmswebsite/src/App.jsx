import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, createRoutesFromElements ,createBrowserRouter} from "react-router-dom";
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
import TeacherApplicationFormView  from "./module/admin/page/ApplicationFormView/TeacherApplicationFormView";
import TeacherApplicationFormReview from "./module/admin/page/TeachersApplicationFormReview/TeacherApplicationFormReview";
import Circulars from "./module/admin/page/Circular/Circulars";
import CreateCircular from "./module/admin/page/CreateCircular/CreateCircular";
import CustomerQuery from "./module/admin/page/CustomerQuery/CustomerQuery"
import CustomerQueryFormView from "./module/admin/page/CustomerQueryViewForm/CustomerQueryViewForm";
import BecomeTeacherApplicationForm from "./module/teacher/pages/BecomeTeacherApplicationForm/BecomeTeacherApplicationForm";
import LandingPage from "./components/common/LandingPage";
import { Public } from "@mui/icons-material";
import PublicRoute from "./module/admin/components/PublicRoute";
import UserManagement from "./module/admin/page/UserManagement/UserManagement";
import manageCustomBatch from "./module/admin/page/manageCustomBatchApproval/manageCustomBatch";
// import { ManagecustomBatchWrap } from "./module/admin/page/manageCustomBatchApproval/manageCustomBatch.styles";
import ManagePayment from "./module/admin/page/managePayment/managePayment";
import TeacherDashboardLayout from "./module/teacher/pages/TeacherDashboardLayout/TeacherDashboardLayout";
import { TeacherDashboardScreenWrap } from "./module/teacher/pages/TeacherDashboard/TeacherDashboardScreen.styles";
import TeacherDashboardScreen from "./module/teacher/pages/TeacherDashboard/TeacherDashboardScreen";
import AssignedTeacherBatch from "./module/teacher/pages/AssignedBatches/AssignedTeacherBatch";
import TeacherCircular from "./module/teacher/pages/TeacherCircular/TeacherCircular";
import SettingsTabs from "./module/teacher/pages/Settings/SettingTapPage/SettingTabs";
import QuizBatches from "./module/teacher/pages/Quizz/QuizzBatches/QuizBatches";
import QuizList from "./module/teacher/pages/Quizz/QuizList/QuizList";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import{ StudentLandingPage,loaderFunction as studentLandingPageLoader} from "./module/student/pages/StudentLandingPage/StudentLandingPage";
import StudentCourseDetailsPage from "./module/student/pages/StudentCourseDetailsPage/StudentCourseDetailsPage";
import SubscriptionSuccess from "./module/student/pages/SubscriptionSuccess/SubscriptionSuccess";


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
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/student"  loader={studentLandingPageLoader} element={<StudentLandingPage />} />
          <Route path="/student/course/details" element={<StudentCourseDetailsPage/>}/>
          <Route path="/student/package/successPage/" element={<SubscriptionSuccess/>}/>


          <Route path="/teacher" element={<BecomeTeacherApplicationForm />} />
          <Route
            path="/teacher/dashboard"
            element={
              <ProtectedRoute>
                <TeacherDashboardLayout/>
              </ProtectedRoute>
            }
          >
            <Route index element={<TeacherDashboardScreen/>} />
            <Route path="/teacher/dashboard/batches" element={<AssignedTeacherBatch/>} />
            <Route path="/teacher/dashboard/circular" element={<TeacherCircular/>} />
            <Route path="/teacher/dashboard/setting" element={<SettingsTabs/>} />
            <Route path="/teacher/dashboard/quizz/assignedBatch" element={<QuizBatches/>} />
            <Route path="/teacher/dashboard/quizz/batches/:batchId" element={<QuizList/>} />
          </Route>
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
              path="/admin/CustomPackages"
              element={<manageCustomBatch />}
            />

            <Route path="/admin/customPayments" element={<ManagePayment />} />
            <Route
              path="/admin/applicationFormReview/teacher/:teacherId"
              element={<TeacherApplicationFormReview />}
            />
            <Route path="/admin/userManagement" element={<UserManagement/>} />
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
      {/* <RouterProvider router={router} /> */}
    </ThemeProvider>
  );
}

export default App;
