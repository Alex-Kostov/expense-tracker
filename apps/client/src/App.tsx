import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                {/*<Route path="/expenses" element={<Expenses />} />*/}
                {/*<Route path="/incomes" element={<Incomes />} />*/}
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
