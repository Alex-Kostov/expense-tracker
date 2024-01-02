import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apiService from "../apiService.ts";

export interface Expense {
	id: string,
	date: string,
	category: string,
	description: string,
	amount: number,
	transactionType: string,
	vault: string,
}

export interface TransactionsState {
	expenses: Expense[];
}

const transactionsState: TransactionsState = {
	expenses: []
};

const transactionsSlice = createSlice({
	name: "transactions",
	initialState: transactionsState,
	reducers: {
		// getExpenses(state, action) {
		//
		// },
		//
		// addExpense(state, action) {
		//
		// },
		//
		// removeExpense(state, action) {
		//
		// }
	},
	extraReducers: (builder) => {
		builder.addCase(fetchExpenses.fulfilled, (state, action) => {
			state.expenses = action.payload;
		});
	}

});

export const fetchExpenses = createAsyncThunk("expenses/fetchExpenses", async () => {
	try {
		return await apiService.getExpenses();
	} catch (error: any) {
		throw new Error("Failed to fetch expenses");
	}
});

export const transactionsActions = transactionsSlice.actions;
export default transactionsSlice.reducer;
