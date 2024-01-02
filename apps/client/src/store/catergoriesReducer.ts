import {createSlice} from "@reduxjs/toolkit";

export interface Category {
	key: string;
	label: string;
}

export interface CategoriesState {
	expenseCategories: Category[];
	incomeCategories: Category[];
}

const categoriesState: CategoriesState = {
	expenseCategories: [
		{key: "supermarkets", label: "Supermarkets"},
		{key: "bills", label: "Bills"},
		{key: "car", label: "Car"},
		{key: "trips", label: "Trips"}
	],
	incomeCategories: [
		{key: "salary", label: "Salary"},
		{key: "bonus", label: "Bonus"},
		{key: "dividends", label: "Dividends"},
		{key: "investments", label: "Investments"}
	]
};

const categoriesSlice = createSlice({
	name: "categories",
	initialState: categoriesState,
	reducers: {
		addCategory(state, action) {
			const {type, category} = action.payload;
			const categories = type === "expense" ? state.expenseCategories : state.incomeCategories;

			const categoryExists = categories.find((c) => c.key === category.key);

			if (!categoryExists) {
				categories.push(category);
			}
		},

		removeIncomeCategory(state, action) {
			const {type, categoryKey} = action.payload;
			const categories = type === "expense" ? state.expenseCategories : state.incomeCategories;
			const categoryIndex = categories.findIndex(c => c.key === categoryKey);

			categories.splice(categoryIndex, 1);

			return;
		}
	}
});

export const categoriesActions = categoriesSlice.actions;
export default categoriesSlice.reducer;
