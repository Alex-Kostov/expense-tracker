import React, {useState} from "react";
import {StoreState} from "../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../store/uiReducer.ts";
import Modal from "./Modal.tsx";
import "./AddExpense.scss";
import {Button, TextField} from "@mui/material";
import apiService from "../apiService.ts";
import {fetchExpenses} from "../store/transactionsReducer.ts";
import {ThunkDispatch} from "@reduxjs/toolkit";

const FORM_DATA_INITIAL_STATE = {
	amount: "",
	description: "",
	category: "",
	date: ""
};

const AddExpense = () => {
	const isOpen = useSelector((state: StoreState) => state.ui.addExpenseIsOpen);

	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const closeAddExpenseModal = () => dispatch(uiActions.closeAddExpenseModal());

	const [formData, setFormData] = useState(FORM_DATA_INITIAL_STATE);

	const resetFormData = () => {
		setFormData(FORM_DATA_INITIAL_STATE);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await apiService.addExpense({...formData, transactionType: "expense", vault: "63d504a8f8b99c066e8d6b71"});
			closeAddExpenseModal();
			resetFormData();
			dispatch(fetchExpenses());
		} catch (error: any) {
			// TODO: Add better error handling.
			console.error(error.message);
		}
	};

	return (
		<Modal open={isOpen} onClose={() => {
			closeAddExpenseModal();
			resetFormData();
		}} className="modal">
			<form onSubmit={handleSubmit}>
				<h3>Add Expense</h3>
				<div className="inputs">
					<TextField name="amount" label="Amount" type="number" variant="outlined" value={formData.amount}
										 onChange={handleChange}/>
					<TextField name="description" label="Description" variant="outlined" value={formData.description}
										 onChange={handleChange} sx={{marginTop: "15px"}}/>
					<TextField name="category" label="Category" variant="outlined" value={formData.category}
										 onChange={handleChange} sx={{marginTop: "15px"}}/>
					{/* TODO: ADD "vault": "63d504a8f8b99c066e8d6b71",*/}
					<TextField name="date" type="date" variant="outlined" value={formData.date} onChange={handleChange}
										 sx={{marginTop: "15px"}}/>
				</div>

				<div className="control-row">
					<Button variant="outlined" onClick={closeAddExpenseModal}>Cancel</Button>
					<Button variant="contained" type="submit">Add</Button>
				</div>
			</form>
		</Modal>
	);
};

export default AddExpense;
