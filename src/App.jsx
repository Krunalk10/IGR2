import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateRolePage from "./pages/CreateRolePage";
import AdminPage from "./pages/admin/AdminPage";
import Dashboard from "@/pages/admin/dashboard/Dashboard";
import RoleList from "./components/RoleList";

export default function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/create-role" element={<CreateRolePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/role-list" element={<RoleList />} />
        </Routes>
      </Router>
    </div>
  );
}
