import React, {Suspense, useEffect} from "react";
import "./Expenses.scss";
import {Button} from "@mui/material";
import Divider from "@mui/material/Divider";
import DataTable from "../components/DataTable.tsx";
import {GridColDef} from "@mui/x-data-grid";
import {Await} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../store/uiReducer.ts";
import {StoreState} from "../store/store.ts";
import {fetchExpenses} from "../store/transactionsReducer.ts";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {mapExpensesWithVaultNames} from "../utills/utils.ts";

const columns: GridColDef[] = [
	{field: "date", headerName: "Date", width: 130},
	{field: "category", headerName: "Category", width: 150},
	{field: "description", headerName: "Description", width: 150},
	{field: "amount", headerName: "Amount", type: "number", width: 100},
	{field: "transactionType", headerName: "Type", width: 100},
	{field: "vault", headerName: "Vault", width: 210}
];

const Expenses = () => {
	const expenses = useSelector((state: StoreState) => state.transactions.expenses);
	const vaults = useSelector((state: StoreState) => state.vaults.vaults);

	const updatedExpenses = mapExpensesWithVaultNames(expenses, vaults);

	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const openModalHandler = () => dispatch(uiActions.openAddExpenseModal());

	useEffect(() => {
		dispatch(fetchExpenses());
	}, [dispatch]);

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
					<Await resolve={updatedExpenses}>
						{(loadedExpenses) => <DataTable columns={columns} rows={loadedExpenses}/>}
					</Await>
				</Suspense>
			</div>
		</>
	);
};

export default Expenses;
