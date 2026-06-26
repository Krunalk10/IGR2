import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import RoleList from "@/components/RoleList";
import { logoutUser } from "@/services/AuthService";
import Dashboard from "@/pages/admin/dashboard/Dashboard"

export default function AdminPage() {
  const navigate = useNavigate();
//   const [activePage, setActivePage] = useState("roles");
  const [activePage, setActivePage] = useState("dashboard");

  const handleLogout = async () => {
    try {
      const result = await logoutUser();

      console.log("Logout Result:", result);
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
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
