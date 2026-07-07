import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import LoginPage from "./modules/pages/LoginPage";
import CreateRolePage from "./modules/pages/CreateRolePage";
import AdminPage from "./modules/pages/admin/AdminPage";
import { ROUTES } from "./modules/routes/routeConfig";

export default function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path={ROUTES.root} element={<LoginPage />} />
          <Route
            path={ROUTES.dashboard}
            element={<Navigate to={ROUTES.adminDashboard} replace />}
          />
          <Route
            path={ROUTES.legacyDashboardCreateRole}
            element={<Navigate to={ROUTES.adminCreateRole} replace />}
          />
          <Route
            path={ROUTES.legacyRoleList}
            element={<Navigate to={ROUTES.adminRoles} replace />}
          />
          <Route
            path={ROUTES.admin}
            element={<Navigate to={ROUTES.adminDashboard} replace />}
          />
          <Route path={ROUTES.adminDashboard} element={<AdminPage />} />
          <Route path={ROUTES.adminRoles} element={<AdminPage />} />
          <Route path={ROUTES.adminCreateRole} element={<CreateRolePage />} />
          <Route path={ROUTES.adminOffice} element={<AdminPage />} />
          <Route path={ROUTES.adminEmployees} element={<AdminPage />} />
          <Route path={ROUTES.adminZones} element={<AdminPage />} />
        </Routes>
      </Router>
    </div>
  );
}
