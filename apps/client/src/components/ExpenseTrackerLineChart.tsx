import React, {useEffect, useMemo} from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useDispatch, useSelector} from "react-redux";
import {StoreState} from "../store/store.ts";
import {fetchTransactions} from "../store/transactionsReducer.ts";
import {ThunkDispatch} from "@reduxjs/toolkit";

interface ChartData {
	name: string;
	expenses: number;
	income: number;
}

const parseDate = (dateString: string) => {
	const [day, month] = dateString.split("/").map(Number);
	return {day, month};
};

const isSameMonth = (dateString: string, currentDate: Date) => {
	const {month} = parseDate(dateString);
	return currentDate.getMonth() + 1 === month;
};

const ExpenseTrackerLineChart = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const expenses = useSelector((state: StoreState) => state.transactions.expenses);
	const income = useSelector((state: StoreState) => state.transactions.income);

	useEffect(() => {
		dispatch(fetchTransactions("expense"));
		dispatch(fetchTransactions("income"));
	}, [dispatch]);

	const currentDate = new Date();

	const data: ChartData[] = useMemo(() => {
		return Array.from({length: 31}, (_, i) => {
			const dayOfMonth = (i + 1).toString();
			const filteredExpenses = expenses.filter(
				(expense) => isSameMonth(expense.date, currentDate) && parseDate(expense.date).day === i + 1
			);
			const filteredIncome = income.filter(
				(incomeAmount) => isSameMonth(incomeAmount.date, currentDate) && parseDate(incomeAmount.date).day === i + 1
			);

			const expenseAmount = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
			const incomeAmount = filteredIncome.reduce((total, income) => total + income.amount, 0);

			return {
				name: dayOfMonth,
				expenses: expenseAmount,
				income: incomeAmount
			};
		});
	}, [expenses, income, currentDate]);

	return (
		<ResponsiveContainer width="95%" height={300}>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray="3 3"/>
				<XAxis dataKey="name"/>
				<YAxis/>
				<Tooltip/>
				<Legend/>
				<Line type="monotone" dataKey="expenses" stroke="red"/>
				<Line type="monotone" dataKey="income" stroke="green"/>
			</LineChart>
		</ResponsiveContainer>
	);
};

export default ExpenseTrackerLineChart;
