// TODO: Add reducer for the store
// import {createSlice} from "@reduxjs/toolkit";
//
// const initialCartState = {
// 	products: [{id: 1, name: "Test Item", quantity: 3, price: 6}],
// 	cartIsOpen: true,
// };
//
// const cartSlice = createSlice({
// 	name: "cart",
// 	initialState: initialCartState,
// 	reducers: {
// 		addItem(state, action) {
// 			const product = state.products.find((p) => p.id === action.payload.id);
//
// 			if (product) {
// 				product.quantity++;
// 				return;
// 			}
//
// 			state.products.push({
// 				id: action.payload.id,
// 				name: action.payload.name,
// 				quantity: 1,
// 				price: action.payload.price,
// 			});
// 		},
//
// 		removeItem(state, action) {
// 			const product = state.products.find((p) => p.id === action.payload.id);
//
// 			if (product && product.quantity > 1) {
// 				product.quantity--;
// 				return;
// 			}
//
// 			state.products = [];
// 		},
//
// 		toggleCart(state) {
// 			state.cartIsOpen = !state.cartIsOpen;
// 		},
// 	},
// });
//
// export const cartActions = cartSlice.actions;
//
// export default cartSlice.reducer;