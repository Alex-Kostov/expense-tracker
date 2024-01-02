import * as React from "react";
import {styled, useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "./AppBar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {StoreState} from "../store/store.ts";
import {uiActions} from "../store/uiReducer.ts";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {NavLink} from "react-router-dom";
import styles from "./Drawer.module.css";
import MoneyOffSharpIcon from "@mui/icons-material/MoneyOffSharp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// TODO: Usage of 2 different styling methods, remove styles or Drawer.module.css, use only one styling method.
// TODO: NAV Links can be moved to separate component to reduce code duplication.

const drawerWidth = 240;

const DrawerHeader = styled("div")(({theme}) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: "flex-end"
}));

export default function PersistentDrawerLeft() {
	const dispatch = useDispatch();
	const toggleDrawer = () => dispatch(uiActions.toggleDrawer());

	const drawerIsOpen = useSelector((state: StoreState) => state.ui.drawerIsOpen);

	const theme = useTheme();

	return (
		<Box sx={{display: "flex"}}>
			<CssBaseline/>
			<AppBar handleDrawerOpen={toggleDrawer} open={drawerIsOpen} drawerWidth={drawerWidth}
							title="Expense Tracker"/>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box"
					}
				}}
				variant="persistent"
				anchor="left"
				open={drawerIsOpen}
			>
				<DrawerHeader>
					<IconButton onClick={toggleDrawer}>
						{theme.direction === "ltr" ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
					</IconButton>
				</DrawerHeader>
				<Divider/>
				<List>
					<NavLink to="/" end
									 className={({isActive}) => isActive ? styles["link-active"] : styles.link}>
						<ListItem key="Dashboard" disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<DashboardIcon/>
								</ListItemIcon>
								<ListItemText primary="Dashboard"/>
							</ListItemButton>
						</ListItem>
					</NavLink>
					<NavLink to="/expenses" end className={({isActive}) => isActive ? styles["link-active"] : styles.link}>
						<ListItem key="Expenses" disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<MoneyOffSharpIcon/>
								</ListItemIcon>
								<ListItemText primary="Expenses"/>
							</ListItemButton>
						</ListItem>
					</NavLink>
					<NavLink to="/income" end className={({isActive}) => isActive ? styles["link-active"] : styles.link}>
						<ListItem key="Income" disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<AttachMoneyIcon/>
								</ListItemIcon>
								<ListItemText primary="Income"/>
							</ListItemButton>
						</ListItem>
					</NavLink>
				</List>
			</Drawer>
		</Box>
	);
}