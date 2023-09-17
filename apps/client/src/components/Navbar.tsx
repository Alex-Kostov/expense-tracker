// @ts-nocheck TODO: FIX TS

import React, { useState } from 'react';
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined,
} from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { AppBar, InputBase, useTheme } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { setMode } from '../state';
// import {setMode} from "react-redux/es/utils/batch";

const Navbar = ({isSideBarOpen, setIsSideBarOpen}) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    return (
        <AppBar
            sx={{
                position: 'static',
                background: 'none',
                boxShadow: 'none',
            }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* LEFT SIDE*/}
                <FlexBetween>
                    <IconButton
                        onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                        <MenuIcon />
                    </IconButton>
                    <FlexBetween
                        // @ts-ignore TODO: Fix TS
                        backgroundColor={theme.palette.background.alt}
                        borderRadius="9px"
                        gap="3rem"
                        p="0.1rem 1.5rem">
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>

                {/* RIGHT SIDE*/}
                <FlexBetween gap="1.5rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkModeOutlined sx={{ fontSize: '25px' }} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: '25px' }} />
                        )}
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{ fontSize: '25px' }} />
                    </IconButton>
                    <IconButton />
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
};
export default Navbar;
