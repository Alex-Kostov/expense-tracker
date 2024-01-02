import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./pages/RootLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Expenses from "./pages/Expenses.tsx";
import Income from "./pages/Income.tsx";

// TODO: Move router to separate file once it gets bigger.
const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout/>,
		children: [
			{
				index: true,
				element: <Dashboard/>
			},
			{
				path: "/expenses",
				element: <Expenses/>
			},
			{
				path: "/income",
				element: <Income/>
			}
		]
	}
]);

function App() {
	return <RouterProvider router={router}/>;
}

export default App;