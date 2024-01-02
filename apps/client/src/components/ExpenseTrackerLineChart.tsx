import React from "react";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const ExpenseTrackerLineChart = () => {
		const data = [];

		for (let day = 1; day <= 31; day++) {
			const randomExpense = parseFloat((Math.random() * 1000).toFixed(2));
			const randomIncome = parseFloat((Math.random() * 1000).toFixed(2));
			data.push({
				"name": day.toString(),
				"expenses": randomExpense,
				"income": randomIncome
			});
		}

		return (
			<LineChart width={1200} height={350} data={data}>
				<CartesianGrid strokeDasharray="3 3"/>
				<XAxis dataKey="name"/>
				<YAxis/>
				<Tooltip/>
				<Legend/>
				<Line type="monotone" dataKey="expenses" stroke="red"/>
				<Line type="monotone" dataKey="income" stroke="green"/>
			</LineChart>
		);
	}
;

export default ExpenseTrackerLineChart;