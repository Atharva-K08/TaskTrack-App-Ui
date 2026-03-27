import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Layout from "./layout/Layout";
import ProfilePage from "./pages/user/ProfilePage";
import Dashboard from "./pages/admin/Dashboard";
import NavBar from "./components/common/NavBar";
import Students from "./pages/admin/Students";
import Teachers from "./pages/admin/Teachers";
import Batches from "./pages/admin/Batches";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        {/* routes in layout */}
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/batches" element={<Batches />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
