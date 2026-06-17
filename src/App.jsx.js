import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import DashboardLayout from '@/pages/DashboardLayout'
import RoleManagement from '@/pages/RoleManagement'
import CreateRole from '@/pages/CreateRole'

export default function App() {
  return (
    <Routes>
      {/* Login Route */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<RoleManagement />} />
        <Route path="role-management" element={<RoleManagement />} />
        <Route path="create-role" element={<CreateRole />} />
        <Route path="office-management" element={<div className="text-center py-10"><p>Office Management Coming Soon</p></div>} />
        <Route path="employee-management" element={<div className="text-center py-10"><p>Employee Management Coming Soon</p></div>} />
        <Route path="zone-management" element={<div className="text-center py-10"><p>Zone Management Coming Soon</p></div>} />
      </Route>

      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
