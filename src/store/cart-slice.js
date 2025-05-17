import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
      state.items = action.payload.items.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      }));
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.totalPrice += newItem.price;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.totalPrice -= existingItem.price;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id != id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.changed = false;
    },
  },
});

// The actions are functions that can be dispatched to update the state
// const sendCartData = (cartData) => {
//   return async (dispatch) => {
//     const sendRequest = async () => {
//       const response = await fetch(
//         "https://reduxcart0452-deffault-rtdb.firebaseio.com/cart.json",
//         {
//           method: "PUT",
//           body: JSON.stringify(cartData),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Sending cart data failed.");
//       }
//     };
//     try {
//       await sendRequest();
//       dispatch(
//         cartActions.showNotification({
//           title: "Success!",
//           message: "Cart data sent successfully!",
//           status: "success",
//         })
//       );
//       dispatch(cartActions.replaceCart(cartData));
//     } catch (error) {
//       dispatch(
//         cartActions.showNotification({
//           title: "Error!",
//           message: "Sending cart data failed.",
//           status: "error",
//         })
//       );
//       console.error("Error sending cart data:", error);
//     }
//   };
// };

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
