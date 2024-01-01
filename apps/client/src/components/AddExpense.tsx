import React, {useState} from "react";
import {StoreState} from "../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../store/uiReducer.ts";
import Modal from "./Modal.tsx";
import "./AddExpense.scss";
import {Button, TextField} from "@mui/material";

const AddExpense = () => {
	const isOpen = useSelector((state: StoreState) => state.ui.addExpenseIsOpen);

	const dispatch = useDispatch();
	const closeAddExpenseModal = () => dispatch(uiActions.closeAddExpenseModal());

	// TODO: Clear Data on modal close and submit
	const [formData, setFormData] = useState({
		amount: "",
		description: "",
		category: "",
		date: ""
	});

	const handleChange = (event) => {
		const {name, value} = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}));
	};

	const handleSubmit = async (event) => {
		// TODO: Create new file for requests.
		event.preventDefault();
		try {
			const response = await fetch("http://localhost:3000/api/v1/transactions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				// TODO: Vault logic to be done.
				body: JSON.stringify({...formData, transactionType: "expense", vault: "65917df1d1da86ec6298e2c5"})
			});

			if (response.ok) {
				closeAddExpenseModal();
			} else {
				console.error("Failed to add expense");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};


	return (
		<Modal open={isOpen} onClose={closeAddExpenseModal} className="modal">
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
