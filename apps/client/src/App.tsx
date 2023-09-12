import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import MiniDrawer from "./components/Drawer";
import AppRoutes from "./Routes";

function App() {
    return (
        <Router>
            <MiniDrawer />
            <AppRoutes />
        </Router>
    );
}

export default App;
