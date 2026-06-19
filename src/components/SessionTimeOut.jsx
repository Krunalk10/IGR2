import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/AuthService";

const TIMEOUT = 15 * 60 * 1000; // 15 minutes

export default function SessionTimeout() {
  const navigate = useNavigate();
  const timerRef = useRef();

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.clear();
      alert("Session expired. Please login again.");
      navigate("/");
    }
  };

  const resetTimer = () => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(logout, TIMEOUT);
  };

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(timerRef.current);

      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  return null;
}
