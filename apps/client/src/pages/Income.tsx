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
import {fetchTransactions} from "../store/transactionsReducer.ts";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {mapTransactionsWithCategoryNames, mapTransactionsWithVaultNames} from "../utills/utils.ts";

const columns: GridColDef[] = [
	{field: "date", headerName: "Date", width: 130},
	{field: "category", headerName: "Category", width: 150},
	{field: "description", headerName: "Description", width: 150},
	{field: "amount", headerName: "Amount", type: "number", width: 100},
	{field: "transactionType", headerName: "Type", width: 100},
	{field: "vault", headerName: "Vault", width: 210}
];

const Income = () => {
	const income = useSelector((state: StoreState) => state.transactions.income);
	const vaults = useSelector((state: StoreState) => state.vaults.vaults);
	const categories = useSelector((state: StoreState) => state.categories.incomeCategories);

	const incomeVaultsMap = mapTransactionsWithVaultNames(income, vaults);
	const incomeCategoriesMap = mapTransactionsWithCategoryNames(incomeVaultsMap, categories);

	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const openModalHandler = () => dispatch(uiActions.openAddExpenseModal());

	useEffect(() => {
		dispatch(fetchTransactions("income"));
	}, [dispatch]);

	return (
		<>
			<div className="top-section">
				<h2>Income</h2>
				<div className="button-container">
					<Button variant="contained" onClick={openModalHandler}>Add Income</Button>
				</div>
			</div>
			<Divider/>
			<div className="bottom-section">
				<h4>Last Income</h4>
				<Suspense fallback={<p>Loading...</p>}>
					<Await resolve={incomeCategoriesMap}>
						{(loadedIncome) => <DataTable columns={columns} rows={loadedIncome}/>}
					</Await>
				</Suspense>
			</div>
		</>
	);
};

export default Income;
