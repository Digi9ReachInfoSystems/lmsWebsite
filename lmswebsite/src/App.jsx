import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
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
import TeacherApplicationFormView from "./module/admin/page/ApplicationFormView/TeacherApplicationFormView";
import TeacherApplicationFormReview from "./module/admin/page/TeachersApplicationFormReview/TeacherApplicationFormReview";
import Circulars from "./module/admin/page/Circular/Circulars";
import CreateCircular from "./module/admin/page/CreateCircular/CreateCircular";
import CustomerQuery from "./module/admin/page/CustomerQuery/CustomerQuery";
import CustomerQueryFormView from "./module/admin/page/CustomerQueryViewForm/CustomerQueryViewForm";
import BecomeTeacherApplicationForm from "./module/teacher/pages/BecomeTeacherApplicationForm/BecomeTeacherApplicationForm";
import LandingPage from "./components/common/LandingPage";
import { Public, Subject } from "@mui/icons-material";
import PublicRoute from "./module/admin/components/PublicRoute";
import UserManagement from "./module/admin/page/UserManagement/UserManagement";
import manageCustomBatch from "./module/admin/page/manageCustomBatchApproval/manageCustomBatch";
// import { Managecustom0BatchWrap } from "./module/admin/page/manageCustomBatchApproval/manageCustomBatch.styles";
import ManagePayment from "./module/admin/page/managePayment/managePayment";
import TeacherDashboardLayout from "./module/teacher/pages/TeacherDashboardLayout/TeacherDashboardLayout";
// import { TeacherDashboardScreenWrap } from "./module/teacher/pages/TeacherDashboard/TeacherDashboardScreen.styles";
import TeacherDashboardScreen from "./module/teacher/pages/TeacherDashboard/TeacherDashboardScreen";
import AssignedTeacherBatch from "./module/teacher/pages/AssignedBatches/AssignedTeacherBatch";
import TeacherCircular from "./module/teacher/pages/TeacherCircular/TeacherCircular";
import SettingsTabs from "./module/teacher/pages/Settings/SettingTapPage/SettingTabs";
import QuizBatches from "./module/teacher/pages/Quizz/QuizzBatches/QuizBatches";
import QuizList from "./module/teacher/pages/Quizz/QuizList/QuizList";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { StudentLandingPage } from "./module/student/pages/StudentLandingPage/StudentLandingPage";
import StudentCourseDetailsPage from "./module/student/pages/StudentCourseDetailsPage/StudentCourseDetailsPage";
import SubscriptionSuccess from "./module/student/pages/SubscriptionSuccess/SubscriptionSuccess";

// import PublicRoute from "./module/admin/components/PublicRoute";
import AssignedBatchStudentsList from "./module/teacher/pages/AssignedBatchStudentsList/AssignedBatchStudentsList";

import ManageContent from "./module/admin/page/ManageContent/ManageContent";
// import ClassForm from "./module/admin/page/ClassForm/ClassForm";
// import SubjectForm from "./module/admin/page/SubjectForm/SubjectForm";
// import BoardForm from "./module/admin/page/BoardForm/BoardForm";
// import PackageForm from "./module/admin/page/PackageForm/PackageForm";
// import FaqForm from "./module/admin/page/FaqForm/FaqForm";
// import BannerForm from "./module/admin/page/BannerForm/BannerForm";
import ManageContentTable from "./module/admin/page/ManageContent/ManageContentTable/ManageContentTable";
import CustomPackage from "./module/admin/page/CustomPackage/CustomPackage";
import PaymentSuccess from "./module/student/pages/PaymentSuccess/PaymentSuccess";
import StudentDashboardLayout from "./module/student/pages/StudentDashboardLayout/StudentDashboardLayout";
import StudentDashboardScreen from "./module/student/pages/StudentDashboard/StudentDashboardScreen";
import ManageMeeting from "./module/teacher/pages/manageMeetings/manageMeeting";

import StudentCircular from "./module/student/pages/StudentCircular/StudentCircular";
import StudentSetting from "./module/student/pages/StudentAccount/StudentSetting/StudentSetting";
import StudentAssignedBatches from "./module/student/pages/StudentAssignedBatches/StudentAssignedBatches";
import StudentTaskBoard from "./module/student/pages/StudentTaskBoard/StudentTaskBoardQuiz/StudentTaskBoard";
import QuizQuestionPage from "./module/student/pages/StudentTaskBoard/QuizQuestionPage/QuizQuestionPage";
import ManageMeetingStudent from "./module/student/pages/manageMeetingsStudent/ManageMeetingStudent";
import { TeacherAttendance } from "./module/teacher/pages/TeacherAttendance/TeacherAttendance";
import { StudentAttendance } from "./module/student/pages/StudentAttendance/StudentAttendance";
import { ManageAttendance } from "./module/admin/page/ManageAttendance/ManageAttendance";
import TeacherdashBoardCards from "./module/teacher/components/TeacherdashBoardCards/TeacherdashBoardCards";
import StudentMaterial from "./module/student/pages/StudentMaterials/StudentMaterial";

import LandingHome from "./Main/Pages/LandingHome";
import RescheduleMeeting from "./module/student/pages/RescheduleMeeting/RescheduleMeeting";
import RescheduleMeetingTeacher from "./module/teacher/pages/RescheduleMeetingTeacher/RescheduleMeetingTeacher";
import { OneToOneStudentlandingPage } from "./module/student/pages/OneToOneLandingPage/OneToOneLandingPage";
import Mode from "./module/student/pages/demomodeupdate/Mode/Mode";
import BoardDetailPage from "./pages/BoardDetailPage/BoardDetailPage";
import ClassDetailPage from "./pages/ClassDetailPage/ClassDetailPage";
import PackageDetailPage from "./pages/PackageDetailPage/PackageDetailPage";
import PackageExpiryAlertPage from "./module/student/pages/PackageExpiryAlertPage/PackageExpiryAlertPage";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage";
import PrivacyAndCookiePolicy from "./pages/PrivacyAndCookiePolicy/PrivacyAndCookiePolicy";
import TermsOfUse from "./pages/Terms Of Use/TermsOfUse";
import RefundCancellationPolicy from "./pages/RefundCancellationPolicy/RefundCancellationPolicy";
import DisclaimerPolicy from "./pages/DisclaimerPolicy/DisclaimerPolicy";
import BatchesLandingPage from "./pages/BatchesDetailPage/BatchesLandingPage";
import LandingPageFinal from "./Main/Pages/LandingPage";
import BoardScreen from "./Main/Pages/BoardScreen/BoardScreen";
import ClassScreen from "./Main/Pages/ClassScreen/CLassScreen";
import SubjectScreen from "./Main/Pages/SubjectScreen/SubjectScreen";
// import SelectTypeScreen from "./Main/Pages/SelectType/SelectType";
import SelectDuration from "./Main/Pages/SelectDuration/SelectDuration";
import SelectType from "./Main/Pages/SelectType/SelectType";
import PaymentScreen from "./module/student/pages/PaymentScreen/PaymentScreen";
import StudentForm from "./pages/SignUpPage/signUpPageStudentForm";
import { notification } from "antd";
import ContactUs from "./Main/Pages/ContactUs/ContactUs";

import Blog from "./Main/Pages/Blogs/Blog";
import TeacherAssignmentUpload from "./module/teacher/pages/Quizz/AssignmentUpload/TeacherAssignmentUpload";
import AssignmentResponse from "./module/teacher/pages/Quizz/AssignmentResponse/AssignmentResponse";
import StudentAssignment from "./module/student/pages/StudentAssignment/StudentAssignment";
import StudentAssignmentUpload from "./module/student/pages/StudentAssignmentUpload/StudentAssignmentUpload";
import OurAcademyPage from "./Main/Pages/OurAcademy/OurAcademyPage";
import ReactGA from "react-ga";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import useOnlineStatus from "./globalInternetConnection";
import PaymentLinkStatusPage from "./module/student/pages/PaymentLinkStatusPage/PaymentStatus";

ReactGA.initialize("G-RN9S1VVZ6Z");
function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  const [count, setCount] = useState(0);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (isOnline) {
      notification.success({
        message: "Back Online",
        description: "Your internet connection has been restored.",
        duration: 2,
      });
    } else {
      notification.error({
        message: "No Internet Connection",
        description: "You are offline. Please check your internet connection.",
        duration: 0, // Keep the notification open until dismissed
      });
    }
  }, [isOnline]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyles />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPageFinal />
              </PublicRoute>
            }
            key=""
          ></Route>
          <Route
            path="/classHomePage"
            element={
              <PublicRoute>
                <ClassScreen />
              </PublicRoute>
            }
            key=""
          ></Route>
          <Route
            path="/Our-Academy"
            element={
              <PublicRoute>
                <OurAcademyPage />
              </PublicRoute>
            }
            key=""
          ></Route>
          <Route
            path="/subjectHomePage"
            element={
              <PublicRoute>
                <SubjectScreen />
              </PublicRoute>
            }
            key=""
          ></Route>
          <Route
            path="/selectBoard"
            element={
              <PublicRoute>
                <BoardScreen />
              </PublicRoute>
            }
            key=""
          ></Route>
          <Route
            path="/selectType"
            element={
              <PublicRoute>
                <SelectType />
              </PublicRoute>
            }
            key=""
          ></Route>{" "}
          <Route
            path="/selectDuration"
            element={
              <PublicRoute>
                <SelectDuration />
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
          <Route
            path="*"
            element={
              <PublicRoute>
                <PageNotFound />
              </PublicRoute>
            }
          />
          {/* <Route path="/testing/:boardId" element={<BoardDetailPage />} /> */}
          <Route
            path="/pages/BatchesDetailPage/BatchesLandingPage/:boardId"
            element={<BatchesLandingPage />}
          />
          <Route path="/testingClass/:classId" element={<ClassDetailPage />} />
          <Route
            path="/testingPackage/:packageId"
            element={<PackageDetailPage />}
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signupStudent" element={<StudentForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/paymentScreen" element={<PaymentScreen />} />
          <Route path="/paymentStatus" element={<PaymentLinkStatusPage />} />
          <Route path="/student" element={<StudentLandingPage />} />
          <Route path="/student/mode" element={<Mode />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/blogs" element={<Blog />} />
          <Route
            path="/student/personal"
            element={<OneToOneStudentlandingPage />}
          />
          <Route
            path="/student/course/details"
            element={<StudentCourseDetailsPage />}
          />
          <Route
            path="/student/package/successPage/"
            element={<SubscriptionSuccess />}
          />
          <Route
            path="/student/package/paymentSucces"
            element={<PaymentSuccess />}
          />
          <Route
            path="/student/package/expiryAlert"
            element={<PackageExpiryAlertPage />}
          />
          <Route path="/privacy-policy" element={<PrivacyAndCookiePolicy />} />
          <Route path="/TermsOfUse" element={<TermsOfUse />} />
          <Route
            path="/RefundCancellationPolicy"
            element={<RefundCancellationPolicy />}
          />
          <Route path="/DisclaimerPolicy" element={<DisclaimerPolicy />} />
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                {" "}
                <StudentDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDashboardScreen />} />
            <Route
              path="/student/dashboard/circular"
              element={<StudentCircular />}
            />
            <Route
              path="/student/dashboard/setting"
              element={<StudentSetting />}
            />
            <Route
              path="/student/dashboard/assignedBatches"
              element={<StudentAssignedBatches />}
            />
            <Route
              path="/student/dashboard/taskBoard"
              element={<StudentTaskBoard />}
            />
            <Route
              path="/student/dashboard/taskBoard/quiz/:quizId"
              element={<QuizQuestionPage />}
            />

            <Route
              path="/student/dashboard/assignments"
              element={<StudentAssignment />}
            />

            <Route
              path="/student/dashboard/batches/:batchId/assignments"
              element={<StudentAssignmentUpload />}
            />

            <Route
              path="/student/dashboard/meetings"
              element={<ManageMeetingStudent />}
            />
            <Route
              path="/student/dashboard/assignedBatches/:batchId"
              element={<StudentMaterial />}
            />
            <Route
              path="/student/dashboard/attendance"
              element={<StudentAttendance />}
            />
            <Route
              path="/student/dashboard/meetings/reschedule"
              element={<RescheduleMeeting />}
            />
          </Route>
          <Route path="/teacher" element={<BecomeTeacherApplicationForm />} />
          <Route
            path="/teacher/dashboard"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<TeacherDashboardScreen />} />

            <Route
              path="/teacher/dashboard/batches"
              element={<AssignedTeacherBatch />}
            />
            <Route
              path="/teacher/dashboard/assigned-batches/:batchId"
              element={<AssignedBatchStudentsList />}
            />
            <Route
              path="/teacher/dashboard/circular"
              element={<TeacherCircular />}
            />
            <Route
              path="/teacher/dashboard/meetings"
              element={<ManageMeeting />}
            />
            <Route
              path="/teacher/dashboard/setting"
              element={<SettingsTabs />}
            />
            <Route
              path="/teacher/dashboard/quizz/assignedBatch"
              element={<QuizBatches />}
            />
            <Route
              path="/teacher/dashboard/quizz/assignedBatch/uploadContent"
              element={<TeacherAssignmentUpload />}
            />
            <Route
              path="/teacher/dashboard/quizz/assignedBatch/uploadContent/:assignmentId/responses"
              element={<AssignmentResponse />}
            />
            <Route
              path="/teacher/dashboard/quizz/batches/:batchId"
              element={<QuizList />}
            />
            <Route
              path="/teacher/dashboard/teacherAttendance"
              element={<TeacherAttendance />}
            />

            <Route
              path="/teacher/dashboard/meetingReschedule"
              element={<RescheduleMeetingTeacher />}
            />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
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
            <Route path="/admin/userManagement" element={<UserManagement />} />
            <Route path="/admin/circular" element={<Circulars />} />
            <Route path="/admin/createcircular" element={<CreateCircular />} />
            <Route path="/admin/customerQueries" element={<CustomerQuery />} />

            <Route path="/admin/manageContent" element={<ManageContent />}>
              <Route
                index
                element={<ManageContentTable contentType="class" />}
              />
              <Route
                path="subject"
                element={<ManageContentTable contentType="subject" />}
              />
              <Route
                path="board"
                element={<ManageContentTable contentType="board" />}
              />
              <Route
                path="package"
                element={<ManageContentTable contentType="package" />}
              />
              <Route
                path="faq"
                element={<ManageContentTable contentType="faq" />}
              />
              <Route
                path="banner"
                element={<ManageContentTable contentType="banner" />}
              />

              <Route
                path="chooseUs"
                element={<ManageContentTable contentType="chooseUs" />}
              />

              <Route
                path="benefits"
                element={<ManageContentTable contentType="benefits" />}
              />

              <Route
                path="typeOfBatch"
                element={<ManageContentTable contentType="typeOfBatch" />}
              />

              <Route
                path="blog"
                element={<ManageContentTable contentType="blog" />}
              />
            </Route>

            <Route path="/admin/customPackage" element={<CustomPackage />} />
            <Route
              path="/admin/customerQueries/:queryId"
              element={<CustomerQueryFormView />}
            />
            <Route
              path="/admin/manageAttendance"
              element={<ManageAttendance />}
            />
          </Route>
        </Routes>
      </Router>
      {/* <RouterProvider router={router} /> */}
    </ThemeProvider>
  );
}

export default App;
