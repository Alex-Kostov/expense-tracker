import {createSlice} from "@reduxjs/toolkit";

export interface UIState {
	drawerIsOpen: boolean;
}

const initialUIState: UIState = {
	drawerIsOpen: true,
};

const uiSlice = createSlice({
	name: "ui",
	initialState: initialUIState,
	reducers: {
		toggleDrawer(state) {
			state.drawerIsOpen = !state.drawerIsOpen;
		}
	}
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
