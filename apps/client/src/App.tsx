import React, { useMemo } from 'react';
import {
    BrowserRouter,
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Layout from './pages/Layout';
import { useSelector } from 'react-redux';
import { State } from './state';
import { createTheme, ThemeProvider } from '@mui/material';
import { themeSettings } from './theme';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
    const mode = useSelector((state: State) => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route element={<Layout />}>
                            <Route
                                path="/"
                                element={<Navigate to="/dashboard" replace />}
                            />
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
