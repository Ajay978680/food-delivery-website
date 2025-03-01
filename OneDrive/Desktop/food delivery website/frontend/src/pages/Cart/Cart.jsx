import React, { useContext } from 'react';
import './cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url,  setCartItems  } = useContext(StoreContext);
  const navigate = useNavigate();

  // Ensure food_list is not undefined to prevent `.map()` errors
  if (!food_list || food_list.length === 0) {
    return <h2 className="empty-cart-message">Your cart is empty.</h2>;
  }

  const totalAmount = getTotalCartAmount();
  const deliveryFee = totalAmount === 0 ? 0 : 2;
  const finalTotal = totalAmount + deliveryFee;

  const handleOrderPlacement = () => {
    setCartItems({});  // ✅ Clears cart after placing order
    localStorage.removeItem("cart"); // ✅ Ensures cart is removed from localStorage
    navigate('/order');
  };

  return (
    <div className='cart'>
      {Object.keys(cartItems).length > 0 && (
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br /> <hr />
          {food_list.map((item) => {
            const quantity = cartItems?.[item._id] ?? 0; // Prevent undefined values
            if (quantity > 0) {
              return (
                <div key={item._id}>
                  <div className='cart-items-title cart-items-item'>
                    <img src={`${url}/images/${item.image}`} alt={item.name} />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{quantity}</p>
                    <p>${item.price * quantity}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })}
        </div>
      )}

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${finalTotal}</b>
            </div>
          </div>
          <button disabled={totalAmount === 0} onClick={handleOrderPlacement}>
  {totalAmount === 0 ? "Cart is Empty" : "PROCEED TO CHECKOUT"}
</button>

        </div>

        <div className='cart-promocode'>
          <div>
            <p>If You Have a Promo Code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='Promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
