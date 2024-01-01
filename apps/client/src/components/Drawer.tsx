import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AppBar from "./AppBar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {StoreState} from "../store/store.ts";
import {uiActions} from "../store/uiReducer.ts";

const drawerWidth = 240;

const DrawerHeader = styled('div')(({theme}) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
	const dispatch = useDispatch();
	const toggleDrawer = () => dispatch(uiActions.toggleDrawer());

	const drawerIsOpen = useSelector((state: StoreState) => state.ui.drawerIsOpen);

	const theme = useTheme();

	return (
		<Box sx={{display: 'flex'}}>
			<CssBaseline/>
			<AppBar handleDrawerOpen={toggleDrawer} open={drawerIsOpen} drawerWidth={drawerWidth}
							title="Expense Tracker"/>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant="persistent"
				anchor="left"
				open={drawerIsOpen}
			>
				<DrawerHeader>
					<IconButton onClick={toggleDrawer}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
					</IconButton>
				</DrawerHeader>
				<Divider/>
				<List>
					{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
								</ListItemIcon>
								<ListItemText primary={text}/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider/>
				<List>
					{['All mail', 'Trash', 'Spam'].map((text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
								</ListItemIcon>
								<ListItemText primary={text}/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
		</Box>
	);
}