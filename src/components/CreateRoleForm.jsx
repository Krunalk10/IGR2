import { useState } from 'react'
import { validateCreateRoleForm } from '../utils/validation'

export default function CreateRoleForm({ onCancel }) {
  const [nameEnglish, setNameEnglish] = useState('')
  const [nameMarathi, setNameMarathi] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('Active')
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setSuccessMessage("");
    setLoading(true);
    setLoading(false);

    const validationErrors = validateCreateRoleForm(
      nameEnglish,
      nameMarathi,
      description,
    );

    if (validationErrors.length > 0) {
      const errorMap = {};

      validationErrors.forEach((error) => {
        errorMap[error.field] = error.message;
      });

      setErrors(errorMap);
      return;
    }

    const payload = {
      nameEnglish,
      nameMarathi,
      description,
      status: status === "Active",
    };

    const result = await createRole(payload);

    if (!result.success) {
      setErrors({
        api: result.message,
      });
      return;
    }

    setSuccessMessage("Role created successfully!");

    setTimeout(() => {
      handleReset();
    }, 2000);
  };

  const handleReset = () => {
    setNameEnglish("");
    setNameMarathi("");
    setDescription("");
    setStatus("Active");
    setErrors({});
    setSuccessMessage("");
  };

  const handleErrorClear = (field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const charCount = description.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.api && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          {errors.api}
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
              handleErrorClear("nameEnglish");
            }}
            placeholder="Enter English Role Name"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.nameEnglish ? "border-red-500" : "border-gray-300"
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
              handleErrorClear("nameMarathi");
            }}
            placeholder="मराठीत भूमिका नाव प्रविष्ट करा"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.nameMarathi ? "border-red-500" : "border-gray-300"
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
              onClick={() =>
                setStatus(status === "Active" ? "Inactive" : "Active")
              }
              className={`relative inline-flex h-10 w-20 rounded-full ${
                status === "Active" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <span
                className={`inline-block h-8 w-8 rounded-full bg-white shadow transform transition-transform ${
                  status === "Active" ? "translate-x-1" : "translate-x-11"
                }`}
              />
            </button>

            <span className="font-medium">{status}</span>
          </div>
        </div>
      </div>

      {/* Description Full Width */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          ROLE DESCRIPTION
        </label>

        <textarea
          rows="5"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value.slice(0, 500));
            handleErrorClear("description");
          }}
          placeholder="Describe role responsibilities..."
          className={`w-full px-4 py-3 rounded-lg border resize-none ${
            errors.description ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />

        <div className="flex justify-between mt-2">
          <div>
            {errors.description && (
              <p className="text-red-600 text-sm">{errors.description}</p>
            )}
          </div>

          <p className="text-sm text-gray-500">{charCount}/500</p>
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
          {loading ? "Creating..." : "Create Role"}
        </button>
      </div>
    </form>
  );
}
