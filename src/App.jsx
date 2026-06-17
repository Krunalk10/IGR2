import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CreateRolePage from "./pages/CreateRolePage";

export default function App() {
	const krunal = {};
	return (
		<div className="app">
			<Router>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/dashboard/create-role" element={<CreateRolePage />} />
				</Routes>
			</Router>
		</div>
	);
}
