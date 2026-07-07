import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "@/modules/components/Sidebar";
import Header from "@/modules/components/Header";
import RoleList from "@/modules/components/RoleList";
import { logoutUser } from "@/features/auth/services/authService";
import Dashboard from "@/modules/pages/admin/dashboard/Dashboard";
import { ROUTES } from "@/modules/routes/routeConfig";

export default function AdminPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActivePage = (pathname) => {
    if (pathname.includes("/roles")) return "roles";
    if (pathname.includes("/office")) return "office";
    if (pathname.includes("/employees")) return "employees";
    if (pathname.includes("/zones")) return "zones";
    return "dashboard";
  };

  const activePage = getActivePage(location.pathname);

  const handleLogout = async () => {
    try {
      const result = await logoutUser();

      console.log("Logout Result:", result);
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      localStorage.clear();
      navigate(ROUTES.root);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={() => {}}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onLogout={handleLogout} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-6">
            {activePage === "dashboard" && <Dashboard />}

            {activePage === "roles" && <RoleList />}

            {activePage === "office" && (
              <div className="bg-white rounded-lg p-8 shadow">
                <h2>Office Management</h2>
              </div>
            )}

            {activePage === "employees" && (
              <div className="bg-white rounded-lg p-8 shadow">
                <h2>Employee Management</h2>
              </div>
            )}

            {activePage === "zones" && (
              <div className="bg-white rounded-lg p-8 shadow">
                <h2>Zone Management</h2>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
