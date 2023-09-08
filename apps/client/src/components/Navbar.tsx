import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div">
                    Teybal
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/expenses">
                    Expenses
                </Button>
                <Button color="inherit" component={Link} to="/incomes">
                    Incomes
                </Button>
                {/* Add more buttons as needed */}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
