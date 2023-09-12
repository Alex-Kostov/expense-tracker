import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
// import Dashboard from "./pages/dashboard/Dashboard";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default AppRoutes;
