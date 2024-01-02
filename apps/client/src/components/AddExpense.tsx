import React, {useState, Suspense} from "react";
import {StoreState} from "../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../store/uiReducer.ts";
import Modal from "./Modal.tsx";
import "./AddExpense.scss";
import {Button, TextField} from "@mui/material";
import {addExpense} from "../store/transactionsReducer.ts";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {Await} from "react-router-dom";
import {Vault} from "../store/vaultsReducer.ts";
import Select from "./Select.tsx";

const FORM_DATA_INITIAL_STATE = {amount: 0, description: "", vault: "", category: "", date: ""};

const AddExpense = () => {
	const isOpen = useSelector((state: StoreState) => state.ui.addExpenseIsOpen);
	const vaults = useSelector((state: StoreState) => state.vaults.vaults);

	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const closeAddExpenseModal = () => dispatch(uiActions.closeAddExpenseModal());

	const [formData, setFormData] = useState(FORM_DATA_INITIAL_STATE);
	const resetFormData = () => setFormData(FORM_DATA_INITIAL_STATE);

	const handleChange = (event: any) => {
		const {name, value} = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await dispatch(addExpense({...formData, transactionType: "expense"}));
			closeAddExpenseModal();
			resetFormData();
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

					<Suspense fallback={<p>Loading...</p>}>
						<Await resolve={vaults}>
							{(loadedVaults: Vault[]) => (
								<Select className="select-field" value={formData.vault} name="vault" onChange={handleChange}>
									<option value="">Select a Vault</option>
									{loadedVaults.map((v) => (
										<option key={v._id} value={v._id}>
											{v.name}
										</option>
									))}
								</Select>
							)}
						</Await>
					</Suspense>

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
