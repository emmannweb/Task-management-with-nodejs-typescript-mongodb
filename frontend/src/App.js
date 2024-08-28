import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/front/NotFound";
import Home from "./pages/front/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";
import Register from "./pages/front/Register";
import Login from "./pages/front/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminShowTask from "./pages/admin/AdminShowTask";
import AdminShowUsers from "./pages/admin/AdminShowUsers";
import Layout from "./pages/global/Layout";
import { ProSidebarProvider } from "react-pro-sidebar";
import UserDashboard from "./pages/user/UserDashboard";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import AdminCreateTask from "./pages/admin/AdminCreateTask";
import UserTask from "./pages/user/UserTask";
import ForgetPassword from "./pages/front/ForgetPassword";
import ResetPassword from "./pages/front/ResetPassword";
import AdminCreateUser from "./pages/admin/AdminCreateUser";
import AdminEditUser from "./pages/admin/AdminEditUser";
import AdminEditTask from "./pages/admin/AdminEditTask";
import UserEditTask from "./pages/user/UserEditTask";
import UserEditInfo from "./pages/user/UserEditInfo";


//HOC
const AdminDashboardHOC = Layout(AdminDashboard);
const AdminShowTaskHOC = Layout(AdminShowTask);
const AdminShowUsersHOC = Layout(AdminShowUsers);
const AdminCreateTaskHOC = Layout(AdminCreateTask);
const AdminCreateUserHOC = Layout(AdminCreateUser);
const AdminEditUserHOC = Layout(AdminEditUser);
const AdminEditTaskHOC = Layout(AdminEditTask);

const UserDashboardHOC = Layout(UserDashboard);
const UserTaskHOC = Layout(UserTask);
const UserEditTaskHOC = Layout(UserEditTask);
const UserEditInfoHOC = Layout(UserEditInfo);

const App = () => {
  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProSidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboardHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/task"
                element={
                  <AdminRoute>
                    <AdminShowTaskHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <AdminShowUsersHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/create/user"
                element={
                  <AdminRoute>
                    <AdminCreateUserHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/user/edit/:userId"
                element={
                  <AdminRoute>
                    <AdminEditUserHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/create/task"
                element={
                  <AdminRoute>
                    <AdminCreateTaskHOC />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/edit/task/:taskId"
                element={
                  <AdminRoute>
                    <AdminEditTaskHOC />
                  </AdminRoute>
                }
              />

              <Route
                path="/user/dashboard"
                element={
                  <UserRoute>
                    <UserDashboardHOC />
                  </UserRoute>
                }
              />
              <Route
                path="/user/task"
                element={
                  <UserRoute>
                    <UserTaskHOC />
                  </UserRoute>
                }
              />

              <Route
                path="/user/edit/task/:taskId"
                element={
                  <UserRoute>
                    <UserEditTaskHOC />
                  </UserRoute>
                }
              />

              <Route
                path="/user/edit/info"
                element={
                  <UserRoute>
                    <UserEditInfoHOC />
                  </UserRoute>
                }
              />

              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/api/resetpassword/:token" element={<ResetPassword />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/search/:keyword" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </ProSidebarProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
