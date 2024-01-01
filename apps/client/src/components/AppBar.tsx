import React from 'react';
import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

interface AppBarStyledProps extends MuiAppBarProps {
	open?: boolean
	drawerWidth: number;
}

interface AppBarProps {
	handleDrawerOpen: React.MouseEventHandler,
	open: boolean,
	drawerWidth: number,
	title: string
}

const AppBarStyled = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<AppBarStyledProps>(({open, drawerWidth}) => ({
	transition: 'margin 0.3s ease',
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: 'margin 0.3s ease',
	}),
	boxShadow: "none",
	borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
}));

const AppBar = ({handleDrawerOpen, open, drawerWidth, title}: AppBarProps) => {
	return (
		<AppBarStyled position="fixed" open={open} drawerWidth={drawerWidth} sx={{backgroundColor: 'white'}}>
			<Toolbar>
				<IconButton
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					sx={{mr: 2, ...(open && {display: 'none'})}}
				>
					<MenuIcon/>
				</IconButton>
				<Typography variant="h6" noWrap component="div" sx={{color: 'black'}}>
					{title}
				</Typography>
			</Toolbar>
		</AppBarStyled>
	);
};

export default AppBar;