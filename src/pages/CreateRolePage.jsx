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
    navigate('/dashboard')
  }

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
          <div className="max-w-3xl mx-auto px-4 py-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Breadcrumb */}
              <div className="mb-6">
                <button
                  onClick={() => navigate("/role-management")}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  ← Back to Role List
                </button>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Role
              </h1>
              <p className="text-gray-600 mb-8 text-sm">
                System Administration &gt; Role Management &gt; Create Role
              </p>

              <CreateRoleForm onCancel={handleCancel} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
