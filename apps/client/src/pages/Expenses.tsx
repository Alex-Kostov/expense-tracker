import React, {Suspense} from "react";
import "./Expenses.scss";
import {Button} from "@mui/material";
import Divider from "@mui/material/Divider";
import DataTable, {Expenses} from "../components/DataTable.tsx";
import {GridColDef} from "@mui/x-data-grid";
import {Await, defer, json, useLoaderData} from "react-router-dom";

const columns: GridColDef[] = [
	{field: "id", headerName: "ID", width: 70},
	{field: "date", headerName: "Date", width: 130},
	{field: "category", headerName: "Category", width: 130},
	{field: "description", headerName: "Description", width: 130},
	{field: "amount", headerName: "Amount", type: "number", width: 130},
	{field: "transactionType", headerName: "Type", width: 130, hideable: true},
	{field: "vault", headerName: "Vault", width: 130}
];

const Expenses = () => {
	const {expenses} = useLoaderData() as { expenses: Expenses[] };

	return (
		<>
			<div className="top-section">
				<h2>Expenses</h2>
				<div className="button-container">
					<Button variant="contained">Add Expense</Button>
				</div>
			</div>
			<Divider/>
			<div className="bottom-section">
				<h4>Last expenses</h4>
				<Suspense fallback={<p>Loading...</p>}>
					<Await resolve={expenses}>
						{(loadedExpenses) => <DataTable columns={columns} rows={loadedExpenses}/>}
						{/*<DataTable columns={columns} rows={rows}/>*/}
					</Await>
				</Suspense>
			</div>
		</>
	);
};


export default Expenses;

const loadExpenses = async () => {
	// TODO: Create new file for requests.
	const response = await fetch("http://localhost:3000/api/v1/transactions?type=expense");

	if (!response.ok) {
		throw json({
			message: "Could not fetch expenses."
		}, {status: 500});
	} else {
		return response.json();
	}
};

export const loader = async () => {
	// also accepts ({request, params}) if needed.
	return defer({expenses: loadExpenses()});
};
