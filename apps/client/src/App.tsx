import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./pages/RootLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Expenses, {loader as ExpensesLoader} from "./pages/Expenses.tsx";

// TODO: Move router to separate file once it gets bigger.
const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout/>,
		children: [
			{
				index: true,
				element: <Dashboard />
			},
			{
				path: "/expenses",
				element: <Expenses />,
				loader: ExpensesLoader
			}
		],
	}
]);

function App() {
	return <RouterProvider router={router}/>;
}

export default App;