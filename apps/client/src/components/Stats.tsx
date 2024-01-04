import React, {useEffect, useMemo} from "react";
import InfoCube from "./InfoCube.tsx";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {StoreState} from "../store/store.ts";
import {fetchTransactions, Transaction} from "../store/transactionsReducer.ts";

const currentDate = new Date();

export interface TransactionsSummary {
	expensesThisMonth: number;
	incomeThisMonth: number;
	savedThisMonth: number;
}

const calculateTransactionsSummary = (expenses: Transaction[], income: Transaction[]): TransactionsSummary => {
	const summary: TransactionsSummary = {
		expensesThisMonth: 0,
		incomeThisMonth: 0,
		savedThisMonth: 0
	};

	const processTransaction = (transaction: Transaction) => {
		const [_day, month, year] = transaction.date.split("/").map(Number);
		const isInCurrentMonth = month === currentDate.getMonth() + 1 && year === currentDate.getFullYear();

		if (isInCurrentMonth) {
			if (transaction.transactionType === "expense") {
				summary.expensesThisMonth += transaction.amount;
			} else if (transaction.transactionType === "income") {
				summary.incomeThisMonth += transaction.amount;
			}
		}
	};

	[...expenses, ...income].forEach(processTransaction);

	summary.savedThisMonth = summary.incomeThisMonth - summary.expensesThisMonth;

	return summary;
};

const Stats = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const expenses = useSelector((state: StoreState) => state.transactions.expenses);
	const income = useSelector((state: StoreState) => state.transactions.income);

	const summary = useMemo(() => calculateTransactionsSummary(expenses, income), [expenses, income]);

	useEffect(() => {
		dispatch(fetchTransactions("expense"));
		dispatch(fetchTransactions("income"));
	}, [dispatch]);

	return (
		<div className="stats">
			<InfoCube label="Expenses" infoText="Current month" amount={summary.expensesThisMonth}/>
			<InfoCube label="Income" infoText="Current month" amount={summary.incomeThisMonth}/>
			<InfoCube label="Saved" infoText="(income - expenses)" amount={summary.savedThisMonth}/>
		</div>
	);
};

export default Stats;
