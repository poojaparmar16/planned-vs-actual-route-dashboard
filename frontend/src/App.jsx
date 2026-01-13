import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import RouteView from "./pages/RouteView/RouteView.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/routes/:routeId"
        element={isAuthenticated ? <RouteView /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
