import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "../../shared/utils/validation";
import { mockLoginCredentials } from "../../data/staticData";
import { loginUser } from "../../features/auth/services/authService";
import { ROUTES } from "../routes/routeConfig";

export default function LoginForm({ userType }) {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const captchaAnswer = mockLoginCredentials.captchaAnswer;

  // const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setSuccessMessage("");
    setIsLoading(true);

    const validationErrors = validateLoginForm(
      loginId,
      password,
      captcha,
      captchaAnswer,
    );

    if (validationErrors.length > 0) {
      const errorMap = {};

      validationErrors.forEach((error) => {
        errorMap[error.field] = error.message;
      });

      setErrors(errorMap);
      setIsLoading(false);
      return;
    }

    try {
      const result = await loginUser(loginId, password);

      console.log("RESULT:", result);
      console.log("success =", result?.success);
      console.log("status =", result?.status);

      if (result?.success) {
        setMessage("Login successful! Redirecting...");
        setMessageType("success");

        setTimeout(() => {
          navigate(ROUTES.adminDashboard);
        }, 1000);
      } else {
        setMessage(result?.message || "Invalid username or password");
        setMessageType("error");
      }
    } catch (error) {
      console.error(error);

      setErrors({
        login: "Login failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setLoginId("");
    setPassword("");
    setCaptcha("");
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-sm">
          ✓ {successMessage}
        </div>
      )}

      {/* Login ID Field */}
      <div>
        <label
          htmlFor="loginId"
          className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide"
        >
          LOGIN ID
        </label>
        <div className="relative">
          <input
            id="loginId"
            type="text"
            value={loginId}
            onChange={(e) => {
              setLoginId(e.target.value);
              handleErrorClear("loginId");
            }}
            placeholder="Enter Your User Id or Email Id"
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${
              errors.loginId
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          <span className="absolute right-3 top-3 text-xl">👤</span>
        </div>
        {errors.loginId && (
          <p className="text-red-600 text-sm mt-1">{errors.loginId}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide"
        >
          PASSWORD
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleErrorClear("password");
            }}
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-xl hover:opacity-70"
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* CAPTCHA Field */}
      <div>
        <label
          htmlFor="captcha"
          className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide"
        >
          CAPTCHA
        </label>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <div className="bg-gray-100 rounded-lg py-3 px-4 text-center font-bold text-lg border border-gray-300 mb-2">
              {captchaAnswer}
            </div>
            <input
              id="captcha"
              type="text"
              value={captcha}
              onChange={(e) => {
                setCaptcha(e.target.value);
                handleErrorClear("captcha");
              }}
              placeholder="Enter CAPTCHA"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${
                errors.captcha
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
          </div>
          <button
            type="button"
            className="mt-10 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-semibold transition-colors"
          >
            🔄
          </button>
        </div>
        {errors.captcha && (
          <p className="text-red-600 text-sm mt-1">{errors.captcha}</p>
        )}
      </div>
      {errors.login && (
        <p className="text-red-600 text-sm text-center font-medium">
          {errors.login}
        </p>
      )}
      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {isLoading ? "LOGGING IN..." : "LOGIN"}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
        >
          CANCEL
        </button>
      </div>
    </form>
  );
}
