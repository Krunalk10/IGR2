import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import CreateRoleForm from '../components/CreateRoleForm'


export default function CreateRolePage() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  const handleCancel = () => {
    navigate("/admin/roles");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        activePage="roles"
        setActivePage={() => {}}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onLogout={handleLogout} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Breadcrumb */}
              <div className="mb-6 flex flex-col gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <button
                    onClick={() => navigate("/admin/")}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    ← Back to Role List
                  </button>
                  <h1 className="text-2xl font-bold text-gray-900 mt-2">
                    Create Role
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">
                    System Administration &gt; Role Management &gt; Create Role
                  </p>
                </div>
                <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-blue-700 shadow-sm">
                  Role Management
                </div>
              </div>

              <CreateRoleForm onCancel={handleCancel} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
