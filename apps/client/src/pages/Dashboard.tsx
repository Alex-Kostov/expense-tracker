import React from "react";
import "./Dashboard.scss";
import Divider from "@mui/material/Divider";
import ExpenseTrackerLineChart from "../components/ExpenseTrackerLineChart.tsx";
import Stats from "../components/Stats.tsx";

const Dashboard = () => {
	return (
		<div className="dashboard">
			<section className="top">
				<h2>Dashboard</h2>
				<Divider/>
				<Stats />
			</section>
			<section className="bottom">
				<div className="expense-chart">
					<h4>Expenses Vs Incomes this month</h4>
					<ExpenseTrackerLineChart/>
				</div>
			</section>
		</div>
	);
};

export default Dashboard;