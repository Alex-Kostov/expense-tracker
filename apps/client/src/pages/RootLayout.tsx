import React from "react";
import {Outlet} from "react-router-dom";
import Drawer from "../components/Drawer.tsx";
import {useSelector} from "react-redux";
import {StoreState} from "../store/store.ts";
import AddExpense from "../components/AddExpense.tsx";

import "./RootLayout.scss";

const RootLayout = () => {
	const drawerIsOpen = useSelector((state: StoreState) => state.ui.drawerIsOpen);

	return (
		<>
			<Drawer/>
			<main className={`main ${drawerIsOpen ? "drawer-is-open" : ""}`}>
				<Outlet/>
				<AddExpense/>
			</main>
		</>
	);
};

export default RootLayout;