import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import RoleList from "../components/RoleList";
import { logoutUser } from "../services/AuthService";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("roles");

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
            {activePage === "roles" && <RoleList />}
            {activePage === "office" && (
              <div className="bg-white rounded-lg p-8 shadow">
                <h2 className="text-2xl font-bold text-gray-900">
                  Office Management
                </h2>
                <p className="text-gray-600 mt-4">Coming soon...</p>
              </div>
            )}
            {activePage === "employees" && (
              <div className="bg-white rounded-lg p-8 shadow">
                <h2 className="text-2xl font-bold text-gray-900">
                  Employee Management
                </h2>
                <p className="text-gray-600 mt-4">Coming soon...</p>
              </div>
            )}
            {activePage === "zones" && (
              <div className="bg-white rounded-lg p-8 shadow">
                <h2 className="text-2xl font-bold text-gray-900">
                  Zone Management
                </h2>
                <p className="text-gray-600 mt-4">Coming soon...</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
