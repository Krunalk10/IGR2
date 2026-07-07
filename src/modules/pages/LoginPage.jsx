import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from "../components/LoginForm";
import { adminPortalTabs, services } from '../../data/staticData'

export default function LoginPage() {
  const [selectedTab, setSelectedTab] = useState('admin')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-xl font-bold text-white">
              🏛️
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                DEPARTMENT OF REGISTRATION AND STAMPS
              </h1>
              <p className="text-sm text-gray-600">GOVERNMENT OF MAHARASHTRA</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <button className="hover:text-blue-600" title="Notifications">
              🔔
            </button>
            <button className="hover:text-blue-600" title="Profile">
              👤
            </button>
            <button className="hover:text-blue-600" title="Share">
              ➡️
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Secure Access to
              </h2>
              <h3 className="text-3xl font-bold text-blue-600 mb-6">
                Single Sign On (SSO)
              </h3>
              <p className="text-gray-700 leading-relaxed mb-8">
                Sign in once to securely access all integrated services and applications
              </p>

              {/* Services Grid */}
              <div className="space-y-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg py-3 text-center text-sm font-medium text-blue-700 transition-colors"
                  >
                    <span className="mr-2">{service.icon}</span>
                    {service.label}
                  </button>
                ))}
              </div>

              {/* Employee Registration Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-8 transition-colors">
                👤 Employee Registration
              </button>

              {/* Downloads Button */}
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg mt-3 transition-colors">
                Downloads Doc
              </button>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200">
                {adminPortalTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                      selectedTab === tab.id
                        ? 'bg-blue-50 border-b-2 border-blue-600 text-blue-600'
                        : 'bg-gray-50 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {selectedTab === tab.id ? '👤' : ''} {tab.label}
                  </button>
                ))}
              </div>

              {/* Form Content */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedTab.toUpperCase()} Login
                </h2>
                <p className="text-gray-600 mb-8 text-sm">
                  Please Enter Your Account Details
                </p>

                <LoginForm userType={selectedTab} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>© 2026 Department of Registration and Stamps, Government of Maharashtra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
