// @ts-nocheck TODO: FIX TS

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, navigate } from 'react-router-dom';
import {
    Drawer,
    useTheme,
    ListItemIcon,
    ListItemText,
    List,
    ListItemButton,
    ListItem,
    Typography,
    IconButton,
    Box,
} from '@mui/material';
import FlexBetween from './FlexBetween';
import {
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
} from '@mui/icons-material';

const navItems = [
    {
        text: 'Dashboard',
        icon: <HomeOutlined />,
    },
    {
        text: 'Client Facing',
        icon: null,
    },
    {
        text: 'Products',
        icon: <ShoppingCartOutlined />,
    },
];

const Sidebar = ({
    drawerWidth,
    isSideBarOpen,
    setIsSideBarOpen,
    isNonMobile,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState('');
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSideBarOpen && (
                <Drawer
                    open={isSideBarOpen}
                    onClose={() => setIsSideBarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        '& .MuiDrawer-paper': {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: 'border-box',
                            borderWidth: isNonMobile ? 0 : '2px',
                            width: drawerWidth,
                        },
                    }}>
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="0.5rem">
                                    <Typography variant="h4" fontWeight="bold">
                                        Expense Tracker
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton
                                        onClick={() =>
                                            setIsSideBarOpen(!isSideBarOpen)
                                        }>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography
                                            key={text}
                                            sx={{ m: '2.25rem 0 1rem 3rem' }}>
                                            {text}
                                        </Typography>
                                    );
                                }
                                const lcText = text.toLowerCase();

                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${lcText}`);
                                                setActive(lcText);
                                            }}
                                            sx={{
                                                backgroundColor:
                                                    active === lcText
                                                        ? theme.palette
                                                              .primary[300]
                                                        : 'transparent',
                                                color:
                                                    active === lcText
                                                        ? theme.palette
                                                              .primary[600]
                                                        : theme.palette
                                                              .secondary[100],
                                            }}>
                                            <ListItemIcon
                                                sx={{
                                                    ml: '2rem',
                                                    color:
                                                        active === lcText
                                                            ? theme.palette
                                                                  .primary[600]
                                                            : theme.palette
                                                                  .secondary[200],
                                                }}>
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text}>
                                                {active === lcText && (
                                                    <ChevronRightOutlined
                                                        sx={{ ml: 'auto' }}
                                                    />
                                                )}
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;
