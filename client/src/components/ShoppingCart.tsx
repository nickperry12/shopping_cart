import { CartItem } from "../types";

interface ShoppingCartProps {
  cartItems: CartItem[],
  checkoutHandler: () => void;
}

const ShoppingCart = ({ cartItems, checkoutHandler }: ShoppingCartProps) => {
  return (
    <header>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        <table className="cart-items">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => 
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="total">Total: ${cartItems.reduce((accum, item) => {
                return (item.price * item.quantity) + accum;
              }, 0)}</td>
            </tr>
          </tfoot>
        </table>
        <div className="checkout-button">
            <button className="checkout" onClick={checkoutHandler}>Checkout</button>
        </div>
      </div>
    </header>
  )
}

export default ShoppingCart;