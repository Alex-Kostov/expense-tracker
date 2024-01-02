import React, {useState, Suspense} from "react";
import {StoreState} from "../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../store/uiReducer.ts";
import Modal from "./Modal.tsx";
import "./AddTransaction.scss";
import {Button, TextField} from "@mui/material";
import {addTransaction} from "../store/transactionsReducer.ts";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {Await, useLocation} from "react-router-dom";
import {Vault} from "../store/vaultsReducer.ts";
import Select from "./Select.tsx";
import {Category} from "../store/catergoriesReducer.ts";

const FORM_DATA_INITIAL_STATE = {amount: 0, description: "", vault: "", category: "", date: ""};

const AddTransaction = () => {
	const {pathname} = useLocation();
	const isExpense = pathname === "/expenses";

	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

	const isOpen = useSelector((state: StoreState) => state.ui.addTransactionIsOpen);
	const vaults = useSelector((state: StoreState) => state.vaults.vaults);
	const categories = useSelector((state: StoreState) => {
		return isExpense ? state.categories.expenseCategories : state.categories.incomeCategories;
	});

	const closeAddTransactionModal = () => dispatch(uiActions.closeAddTransactionModal());

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
			await dispatch(addTransaction({...formData, transactionType: isExpense ? "expense" : "income"}));
			closeAddTransactionModal();
			resetFormData();
		} catch (error: any) {
			// TODO: Add error handling component
			console.error(error.message);
		}
	};

	return (
		<Modal open={isOpen} onClose={() => {
			closeAddTransactionModal();
			resetFormData();
		}} className="modal">
			<form onSubmit={handleSubmit}>
				<h3>Add {isExpense ? 'Expense' : 'Income'}</h3>
				<div className="inputs">
					<TextField name="amount" label="Amount" type="number" variant="outlined" value={formData.amount} required
										 onChange={handleChange}/>
					<TextField name="description" label="Description" variant="outlined" value={formData.description} required
										 onChange={handleChange} sx={{marginTop: "15px"}}/>

					<Suspense fallback={<p>Loading...</p>}>
						<Await resolve={categories}>
							{(loadedCategories: Category[]) => (
								<Select className="select-field" value={formData.category} name="category" onChange={handleChange}
												required>
									<option value="">Select a Category</option>
									{loadedCategories.map((c) => (
										<option key={c.key} value={c.key}>
											{c.label}
										</option>
									))}
								</Select>
							)}
						</Await>
					</Suspense>

					<Suspense fallback={<p>Loading...</p>}>
						<Await resolve={vaults}>
							{(loadedVaults: Vault[]) => (
								<Select className="select-field" value={formData.vault} name="vault" onChange={handleChange} required>
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

					<TextField name="date" type="date" variant="outlined" value={formData.date} required onChange={handleChange}
										 sx={{marginTop: "15px"}}/>
				</div>

				<div className="control-row">
					<Button variant="outlined" onClick={closeAddTransactionModal}>Cancel</Button>
					<Button variant="contained" type="submit">Add</Button>
				</div>
			</form>
		</Modal>
	);
};

export default AddTransaction;
