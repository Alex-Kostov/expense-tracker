import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                {/*<Route path="/expenses" element={<Expenses />} />*/}
                {/*<Route path="/incomes" element={<Incomes />} />*/}
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
