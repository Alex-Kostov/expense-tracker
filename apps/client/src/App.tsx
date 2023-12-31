import React from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

// TODO: Move router to separate file once it gets bigger.
const router = createBrowserRouter([
	{
		// path: "/",
		// element: <RootLayout/>,
		// // errorElement,
		// children: [],
	}
]);

function App() {

	return <RouterProvider router={router}/>;
}

export default App
