import React, { useContext, useState } from 'react';
import './cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const validPromoCodes = { "14mar25": 0.10, "SPRING50": 0.15 }; // Add more codes if needed

  const totalAmount = getTotalCartAmount();
  const discountAmount = totalAmount * discount;
  const deliveryFee = totalAmount === 0 ? 0 : 20;
  const finalTotal = totalAmount - discountAmount + deliveryFee;

  const applyPromoCode = () => {
    if (validPromoCodes[promoCode]) {
      setDiscount(validPromoCodes[promoCode]); // Apply discount percentage
    } else {
      alert("Invalid promo code!");
      setDiscount(0);
    }
  };

  const handleOrderPlacement = () => {
    setCartItems(cartItems); 
    localStorage.removeItem("cart");
    navigate('/order', { state: { finalTotal } }); // Pass finalTotal to PlaceOrder
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
            const quantity = cartItems?.[item._id] ?? 0;
            if (quantity > 0) {
              return (
                <div key={item._id}>
                  <div className='cart-items-title cart-items-item'>
                    <img src={`${url}/images/${item.image}`} alt={item.name} />
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <p>{quantity}</p>
                    <p>₹{item.price * quantity}</p>
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
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{totalAmount.toFixed(2)}</p>
          </div>
          {discount > 0 && (
            <>
              <hr />
              <div className="cart-total-details">
                <p>Discount</p>
                <p>-₹{discountAmount.toFixed(2)}</p>
              </div>
            </>
          )}
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{deliveryFee}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{finalTotal.toFixed(2)}</b>
          </div>
          <button disabled={totalAmount === 0} onClick={handleOrderPlacement}>
            {totalAmount === 0 ? "Cart is Empty" : "PROCEED TO CHECKOUT"}
          </button>
        </div>

        <div className='cart-promocode'>
          <div>
            <p>If You Have a Promo Code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='Promo code' value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
              <button onClick={applyPromoCode}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
