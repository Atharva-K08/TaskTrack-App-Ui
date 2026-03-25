import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import Layout from './layout/Layout'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* routes in layout */}
          <Route path="/" element={<Layout />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App