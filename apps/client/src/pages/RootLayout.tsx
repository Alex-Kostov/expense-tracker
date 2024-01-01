import React from 'react';
import {Outlet} from "react-router-dom";
import Drawer from "../components/Drawer.tsx";
import {useSelector} from "react-redux";
import {StoreState} from "../store/store.ts";
import styles from './RootLayout.module.css';

const RootLayout = () => {
	const drawerIsOpen = useSelector((state: StoreState) => state.ui.drawerIsOpen);

	return (
		<>
			<Drawer/>
			<main className={`${styles.main} ${drawerIsOpen ? styles.drawerIsOpen : undefined}`}>
				<Outlet/>
			</main>
		</>
	);
};

export default RootLayout;