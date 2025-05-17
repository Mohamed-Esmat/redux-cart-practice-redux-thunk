import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  return (
    <>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;

// const sendCartData = async () => {
//   try {
//     dispatch(
//       uiActions.showNotification({
//         title: "Sending...",
//         message: "Sending cart data",
//         status: "pending",
//       })
//     );
//     const response = await fetch(
//       "https://reduxcart0452-default-rtdb.firebaseio.com/cart.json",
//       {
//         method: "PUT",
//         body: JSON.stringify(cart),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Sending cart data failed.");
//     }
//     // const responseData = await response.json();
//     dispatch(
//       uiActions.showNotification({
//         title: "Success!",
//         message: "Cart data sent successfully!",
//         status: "success",
//       })
//     );
//   } catch (error) {
//     dispatch(
//       uiActions.showNotification({
//         title: "Error!",
//         message: "Sending cart data failed.",
//         status: "error",
//       })
//     );
//     console.error("Error sending cart data:", error);
//   }
// };

// if (isInitial) {
//   isInitial = false;
//   return;
// }

// sendCartData();
