import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apiService from "../apiService.ts";

export interface Transaction {
	id?: string,
	date: string,
	category: string,
	description: string,
	amount: number,
	transactionType: "income" | "expense",
	vault: string,
}

export interface TransactionsState {
	expenses: Transaction[];
	income: Transaction[];
}

const transactionsState: TransactionsState = {
	expenses: [],
	income: []
};

const transactionsSlice = createSlice({
	name: "transactions",
	initialState: transactionsState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchTransactions.fulfilled, (state, action) => {
			const {type, data} = action.payload;
			state[type === "expense" ? "expenses" : "income"] = data;
		});
	}

});

export const fetchTransactions = createAsyncThunk("transactions/fetchTransactions", async (type: "income" | "expense") => {
	try {
		const data = await apiService.getTransactions(type);
		return {type, data};
	} catch (error: any) {
		throw new Error("Failed to fetch expenses");
	}
});

export const addTransaction = createAsyncThunk("transactions/addTransaction", async (transaction: Transaction, {dispatch}) => {
	try {
		await apiService.addTransaction(transaction);
		dispatch(fetchTransactions(transaction.transactionType));
		return transaction;
	} catch (error: any) {
		throw new Error(`Failed to fetch ${transaction.transactionType}`);
	}
});

export const transactionsActions = transactionsSlice.actions;
export default transactionsSlice.reducer;
