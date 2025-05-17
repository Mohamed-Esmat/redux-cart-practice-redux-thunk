import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://reduxcart0452-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could no fetch cart data!");
      }
      const cartData = await response.json();
      return cartData;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity || 0,
          totalPrice: cartData.totalPrice || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          title: "Error!",
          message: "Fetching cart data failed.",
          status: "error",
        })
      );
      console.error("Error fetching cart data:", error);
    }
  };
};

export const sendCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        title: "Sending...",
        message: "Sending cart data",
        status: "pending",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://reduxcart0452-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cartData.items,
            totalQuantity: cartData.totalQuantity,
            totalPrice: cartData.totalPrice,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
      // const responseData = await response.json();
      // return responseData;
    };
    try {
      // const responseData = await sendRequest();
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          title: "Success!",
          message: "Cart data sent successfully!",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          title: "Error!",
          message: "Sending cart data failed.",
          status: "error",
        })
      );
      console.error("Error sending cart data:", error);
    }
  };
};
