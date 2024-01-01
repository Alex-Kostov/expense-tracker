import {createSlice} from "@reduxjs/toolkit";

export interface UIState {
	drawerIsOpen: boolean;
	addExpenseIsOpen: boolean;
}

const initialUIState: UIState = {
	drawerIsOpen: true,
	addExpenseIsOpen: false
};

const uiSlice = createSlice({
	name: "ui",
	initialState: initialUIState,
	reducers: {
		toggleDrawer(state) {
			state.drawerIsOpen = !state.drawerIsOpen;
		},

		closeAddExpenseModal(state) {
			state.addExpenseIsOpen = false;
		},

		openAddExpenseModal(state) {
			state.addExpenseIsOpen = true;
		}
	}
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
