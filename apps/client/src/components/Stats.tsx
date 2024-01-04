import React, {Suspense, useEffect, useMemo} from "react";
import InfoCube from "./InfoCube.tsx";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {StoreState} from "../store/store.ts";
import {fetchTransactions, Transaction} from "../store/transactionsReducer.ts";
import {Await} from "react-router-dom";

const currentDate = new Date();

export interface TransactionsSummary {
	expensesThisMonth: number;
	incomeThisMonth: number;
	savedThisMonth: number;
}

const calculateExpensesThisMonth = (transactions: Transaction[]): number => {
	return transactions
		.filter((t) => t.transactionType === "expense" && isTransactionInCurrentMonth(t, currentDate))
		.reduce((total, expense) => total + expense.amount, 0);
};

const calculateIncomeThisMonth = (transactions: Transaction[]): number => {
	return transactions
		.filter((t) => t.transactionType === "income" && isTransactionInCurrentMonth(t, currentDate))
		.reduce((total, income) => total + income.amount, 0);
};

const isTransactionInCurrentMonth = (transaction: Transaction, currentDate: Date): boolean => {
	const [_day, month, year] = transaction.date.split("/").map(Number);
	return month === currentDate.getMonth() + 1 && year === currentDate.getFullYear();
};

export const calculateTransactionsSummary = (transactions: Transaction[]): TransactionsSummary => {
	const expensesThisMonth = calculateExpensesThisMonth(transactions);
	const incomeThisMonth = calculateIncomeThisMonth(transactions);
	const savedThisMonth = incomeThisMonth - expensesThisMonth;

	return {expensesThisMonth, incomeThisMonth, savedThisMonth};
};

const Stats = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const expenses = useSelector((state: StoreState) => state.transactions.expenses);
	const income = useSelector((state: StoreState) => state.transactions.income);
	const transactions = useMemo(() => [...expenses, ...income], [expenses, income]);

	const summary = calculateTransactionsSummary(transactions);

	useEffect(() => {
		dispatch(fetchTransactions("expense"));
		dispatch(fetchTransactions("income"));
	}, [dispatch]);

	return (
		<Suspense fallback={<p>Loading ...</p>}>
			<Await resolve={summary}>
				{(loadedSummary) => {
					return (<div className="stats">
						{/*<InfoCube label="Balance" infoText="All Time" amount={"9999"}/>*/}
						<InfoCube label="Expenses" infoText="Current month" amount={loadedSummary.expensesThisMonth}/>
						<InfoCube label="Income" infoText="Current month" amount={loadedSummary.incomeThisMonth}/>
						<InfoCube label="Saved" infoText="(income - expenses)" amount={loadedSummary.savedThisMonth}/>
					</div>);
				}}
			</Await>
		</Suspense>
	);
};

export default Stats;