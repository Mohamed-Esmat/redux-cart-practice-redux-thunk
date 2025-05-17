import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions } from "../../store/cart-slice";

const CartItem = ({ item }) => {
  const { title, price, quantity, totalPrice } = item;
  const dispatch = useDispatch();
  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: item.id,
        title,
        price,
        // quantity,
        // totalPrice: price * quantity,
      })
    );
  };
  const removeItemHandler = () => {
    dispatch(cartActions.removeFromCart(item.id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
