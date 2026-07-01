import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateCreateRoleForm } from "../utils/validation";
import { createRole, updateRole } from "../services/AuthService";

export default function CreateRoleForm({
  onCancel,
  setRoles,
  initialRole = null,
  mode = "create",
  onSuccess = null,
}) {
  const navigate = useNavigate();
  const isEditMode = mode === "edit" && initialRole;
  const [nameEnglish, setNameEnglish] = useState(
    initialRole?.nameEnglish || initialRole?.firstName || "",
  );
  const [nameMarathi, setNameMarathi] = useState(
    initialRole?.nameMarathi ||
      initialRole?.fullNameMr ||
      initialRole?.lastName ||
      "",
  );
  const [description, setDescription] = useState(
    initialRole?.description || initialRole?.designation || "",
  );
  const [status, setStatus] = useState(initialRole?.status || "Active");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [createdRole, setCreatedRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleErrorClear = (field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  useEffect(() => {
    if (initialRole) {
      setNameEnglish(initialRole?.nameEnglish || initialRole?.firstName || "");
      setNameMarathi(
        initialRole?.nameMarathi ||
          initialRole?.fullNameMr ||
          initialRole?.lastName ||
          "",
      );
      setDescription(
        initialRole?.description || initialRole?.designation || "",
      );
      setStatus(initialRole?.status || "Active");
    }
  }, [initialRole]);

  const charCount = description.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError("");
    setSuccessMessage("");
    setCreatedRole(null);
    setLoading(true);

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
      setLoading(false);
      return;
    }

    const payload = {
      id: initialRole?.id || initialRole?.roleId,
      roleId: initialRole?.id || initialRole?.roleId,
      nameEnglish: nameEnglish.trim(),
      nameMarathi: nameMarathi.trim().replace(/\r?\n/g, " "),
      description: description.trim(),
      status,
      createdBy: initialRole?.createdBy || "Super Admin",
      createdOn: initialRole?.createdOn || new Date().toISOString(),
      firstName: nameEnglish.trim(),
      fullNameMr: nameMarathi.trim().replace(/\r?\n/g, " "),
      designation: description.trim(),
    };

    try {
      const response = isEditMode
        ? await updateRole(payload)
        : await createRole(payload);
      const roleToShow = response?.data || payload;
      setCreatedRole(roleToShow);
      setSuccessMessage(
        isEditMode
          ? "Role updated successfully"
          : response.message || "Role created successfully",
      );

      if (setRoles) {
        setRoles((prev) => {
          if (isEditMode && initialRole?.id) {
            return prev.map((item) =>
              String(item.id) === String(initialRole.id) ? roleToShow : item,
            );
          }
          return [roleToShow, ...prev];
        });
      }

      if (onSuccess) {
        onSuccess(roleToShow);
      } else {
        navigate("/admin", { state: { refreshRoles: true } });
      }
    } catch (err) {
      setApiError(err.message || "Failed to create role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-md"
    >
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
              className={`relative inline-flex h-8 w-20 rounded-full ${
                status === "Active" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <span
                className={`inline-block h-8 w-8 rounded-full bg-white shadow transform transition-transform ${
                  status === "Active" ? "translate-x--1" : "translate-x-12"
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
          {loading
            ? isEditMode
              ? "Updating..."
              : "Creating..."
            : isEditMode
              ? "Update Role"
              : "Create Role"}
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
