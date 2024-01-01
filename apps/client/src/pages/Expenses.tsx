import React, {Suspense} from "react";
import "./Expenses.scss";
import {Button} from "@mui/material";
import Divider from "@mui/material/Divider";
import DataTable, {Expenses} from "../components/DataTable.tsx";
import {GridColDef} from "@mui/x-data-grid";
import {Await, defer, json, useLoaderData} from "react-router-dom";
import {useDispatch} from "react-redux";
import {uiActions} from "../store/uiReducer.ts";

const columns: GridColDef[] = [
	{field: "id", headerName: "ID", width: 210},
	{field: "date", headerName: "Date", width: 130},
	{field: "category", headerName: "Category", width: 100},
	{field: "description", headerName: "Description", width: 150},
	{field: "amount", headerName: "Amount", type: "number", width: 100},
	{field: "transactionType", headerName: "Type", width: 100},
	{field: "vault", headerName: "Vault", width: 210}
];

const Expenses = () => {
	const dispatch = useDispatch();
	const openModalHandler = () => dispatch(uiActions.openAddExpenseModal());

	// TODO: Expenses are not being updated automatically on Add Expense
	const {expenses} = useLoaderData() as { expenses: Expenses[] };

	return (
		<>
			<div className="top-section">
				<h2>Expenses</h2>
				<div className="button-container">
					<Button variant="contained" onClick={openModalHandler}>Add Expense</Button>
				</div>
			</div>
			<Divider/>
			<div className="bottom-section">
				<h4>Last expenses</h4>
				<Suspense fallback={<p>Loading...</p>}>
					<Await resolve={expenses}>
						{(loadedExpenses) => <DataTable columns={columns} rows={loadedExpenses}/>}
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
		const resData: Expenses[] = await response.json();
		const formattedExpenses = resData.map((e) => {
			const dateObject = new Date(e.date);
			const date = new Intl.DateTimeFormat("en-GB").format(dateObject);

			return {
				...e,
				date
			};
		});

		return formattedExpenses;
	}
};

export const loader = async () => {
	// also accepts ({request, params}) if needed.
	return defer({expenses: loadExpenses()});
};
