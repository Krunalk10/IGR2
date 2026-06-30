import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateCreateRoleForm } from '../utils/validation';
import { createDemoRole } from '../services/DemoRoleService';

export default function CreateRoleForm({ onCancel, setRoles }) {
  const [nameEnglish, setNameEnglish] = useState('');
  const [nameMarathi, setNameMarathi] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [createdRole, setCreatedRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleErrorClear = (field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const charCount = description.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError('');
    setSuccessMessage('');
    setCreatedRole(null);
    setLoading(true);

    const validationErrors = validateCreateRoleForm(
      nameEnglish,
      nameMarathi,
      description
    );

    if (validationErrors.length > 0) {
      const errorMap = {};
      validationErrors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      setLoading(false);
      return;
    }

    const payload = {
        dto: {
          fullNameEn: nameEnglish,
          fullNameMr: nameMarathi.replace(/\r?\n/g, ' '),
          description,
          status,
        },
      };
    try {
      const response = await createDemoRole(payload);
      setCreatedRole(response);
      setSuccessMessage('Role created successfully');
      // Navigate back to role list so the new role appears
            // Navigate back to role list so the new role appears
      navigate('/admin');
      if (setRoles) {
        setRoles((prev) => [...prev, response]);
      }
    } catch (err) {
      setApiError(err.message || 'Failed to create role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {apiError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          {apiError}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-sm">
          ✓ {successMessage}
        </div>
      )}
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* English Role Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ROLE NAME (ENGLISH)
          </label>
          <input
            type="text"
            value={nameEnglish}
            onChange={(e) => {
              setNameEnglish(e.target.value);
              handleErrorClear('nameEnglish');
            }}
            placeholder="Enter English Role Name"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.nameEnglish ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.nameEnglish && (
            <p className="text-red-600 text-sm mt-1">{errors.nameEnglish}</p>
          )}
        </div>
        {/* Marathi Role Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ROLE NAME (MARATHI)
          </label>
          <input
            type="text"
            value={nameMarathi}
            onChange={(e) => {
              setNameMarathi(e.target.value);
              handleErrorClear('nameMarathi');
            }}
            placeholder="मराठीत भूमिका नाव प्रविष्ट करा"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.nameMarathi ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.nameMarathi && (
            <p className="text-red-600 text-sm mt-1">{errors.nameMarathi}</p>
          )}
        </div>
        {/* Created By */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            CREATED BY
          </label>
          <input
            type="text"
            value="Super Admin"
            disabled
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100"
          />
        </div>
        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ROLE STATUS
          </label>
          <div className="flex items-center gap-4 mt-2">
            <button
              type="button"
              onClick={() => setStatus(status === 'Active' ? 'Inactive' : 'Active')}
              className={`relative inline-flex h-10 w-20 rounded-full ${
                status === 'Active' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              <span
                className={`inline-block h-8 w-8 rounded-full bg-white shadow transform transition-transform ${
                  status === 'Active' ? 'translate-x-1' : 'translate-x-11'
                }`}
              />
            </button>
            <span className="font-medium">{status}</span>
          </div>
        </div>
        {/* Description Full Width */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ROLE DESCRIPTION
          </label>
          <textarea
            rows="5"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value.slice(0, 500));
              handleErrorClear('description');
            }}
            placeholder="Describe role responsibilities..."
            className={`w-full px-4 py-3 rounded-lg border resize-none ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <div className="flex justify-between mt-2">
            <div>{errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}</div>
            <p className="text-sm text-gray-500">{charCount}/500</p>
          </div>
        </div>
      </div>
      {/* Buttons Right Side */}
      <div className="flex justify-end gap-3 border-t pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Role'}
        </button>
      </div>
      {/* Display created role details */}
      {createdRole && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Created Role</h2>
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(createdRole, null, 2)}
          </pre>
        </div>
      )}
    </form>
  );
}
