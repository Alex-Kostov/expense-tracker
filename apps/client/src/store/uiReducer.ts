import {createSlice} from "@reduxjs/toolkit";

export interface UIState {
	drawerIsOpen: boolean;
	addTransactionIsOpen: boolean;
}

const initialUIState: UIState = {
	drawerIsOpen: true,
	addTransactionIsOpen: false
};

const uiSlice = createSlice({
	name: "ui",
	initialState: initialUIState,
	reducers: {
		toggleDrawer(state) {
			state.drawerIsOpen = !state.drawerIsOpen;
		},

		closeAddTransactionModal(state) {
			state.addTransactionIsOpen = false;
		},

		openAddExpenseModal(state) {
			state.addTransactionIsOpen = true;
		}
	}
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
