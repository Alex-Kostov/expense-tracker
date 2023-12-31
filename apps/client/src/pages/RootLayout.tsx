import React from 'react';
import {Outlet} from "react-router-dom";
import Drawer from "../components/Drawer.tsx";

const RootLayout = () => {
	return (
		<>
			<Drawer/>
			<main className="main-content">
				<Outlet/>
			</main>
		</>
	);
};

export default RootLayout;