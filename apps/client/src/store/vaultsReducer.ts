import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apiService from "../apiService.ts";

export interface Vault {
	"_id"?: string;
	name: string;
	balance: number;
	type: string;
	currency?: string; // To be done...
	"__v"?: number;
}

export interface VaultsState {
	vaults: Vault[];
}

const vaultsState: VaultsState = {
	vaults: []
};

const vaultsSlice = createSlice({
	name: "vaults",
	initialState: vaultsState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchVaults.fulfilled, (state, action) => {
			state.vaults = action.payload;
		});
	}
});

export const fetchVaults = createAsyncThunk("vaults/fetchVaults", async () => {
	try {
		return await apiService.getVaults();
	} catch (error: any) {
		throw new Error("Failed to fetch vaults");
	}
});

export const vaultsActions = vaultsSlice.actions;
export default vaultsSlice.reducer;
