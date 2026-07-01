import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateRolePage from "./pages/CreateRolePage";
import AdminPage from "./pages/admin/AdminPage";

export default function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route
            path="/dashboard/create-role"
            element={<Navigate to="/admin/roles/create" replace />}
          />
          <Route
            path="/role-list"
            element={<Navigate to="/admin/roles" replace />}
          />
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route path="/admin/dashboard" element={<AdminPage />} />
          <Route path="/admin/roles" element={<AdminPage />} />
          <Route path="/admin/roles/create" element={<CreateRolePage />} />
          <Route path="/admin/office" element={<AdminPage />} />
          <Route path="/admin/employees" element={<AdminPage />} />
          <Route path="/admin/zones" element={<AdminPage />} />
        </Routes>
      </Router>
    </div>
  );
}
