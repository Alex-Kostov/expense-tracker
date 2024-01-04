import React from "react";
import "./Dashboard.scss";
import InfoCube from "../components/InfoCube.tsx";
import Divider from "@mui/material/Divider";
import ExpenseTrackerLineChart from "../components/ExpenseTrackerLineChart.tsx";

const Dashboard = () => {
	return (
		<div className="dashboard">
			<section className="top">
				<h2>Dashboard</h2>
				<Divider/>
				<div className="stats">
					<InfoCube label="Balance" infoText="All Time" amount={9000}/>
					<InfoCube label="Expenses" infoText="Current month" amount={15.23}/>
					<InfoCube label="Income" infoText="Current month" amount={100}/>
					<InfoCube label="Saved" infoText="(income - expenses)" amount={9000}/>
				</div>
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