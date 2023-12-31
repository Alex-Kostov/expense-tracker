import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./pages/RootLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";

// TODO: Move router to separate file once it gets bigger.
const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout/>,
		children: [
			{
				index: true,
				element: <Dashboard />
			}
		],
	}
]);

function App() {
	return <RouterProvider router={router}/>;
}

export default App;