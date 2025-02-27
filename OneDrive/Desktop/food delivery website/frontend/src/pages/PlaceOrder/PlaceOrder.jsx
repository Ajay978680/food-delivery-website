import { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, food_list, cartItems, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [paymentType, setPaymentType] = useState("Cash");
  const [errors, setErrors] = useState({});

  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));

    // Remove error when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const isFormValid = () => {
    let newErrors = {};
    Object.entries(data).forEach(([key, value]) => {
      if (value.trim() === "") {
        newErrors[key] = "Required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const placeOrder = (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      return;
    }

    let orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({ ...item, quantity: cartItems[item._id] }));

    let orderData = {
      ...data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    console.log("Order Placed:", orderData);

    clearCart(); // Clears the cart after checkout

    navigate("/order-placed");
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input className={errors.firstName ? "error" : ""} required name="firstName" onChange={onchangeHandler} value={data.firstName} type="text" placeholder="First Name" />
          <input className={errors.lastName ? "error" : ""} required name="lastName" onChange={onchangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input className={errors.email ? "error" : ""} required name="email" onChange={onchangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input className={errors.street ? "error" : ""} required name="street" onChange={onchangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input className={errors.city ? "error" : ""} required name="city" onChange={onchangeHandler} value={data.city} type="text" placeholder="City" />
          <input className={errors.state ? "error" : ""} required name="state" onChange={onchangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input className={errors.zipcode ? "error" : ""} required name="zipcode" onChange={onchangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" />
          <input className={errors.country ? "error" : ""} required name="country" onChange={onchangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input className={errors.phone ? "error" : ""} required name="phone" onChange={onchangeHandler} value={data.phone} type="text" placeholder="Phone" />
      </div>
      
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="payment-options">
            <label>
              <input type="radio" name="paymentType" value="Cash" checked={paymentType === "Cash"} onChange={(e) => setPaymentType(e.target.value)} />
              Cash on Delivery
            </label>
            <label>
              <input type="radio" name="paymentType" value="Online" checked={paymentType === "Online"} onChange={(e) => setPaymentType(e.target.value)} />
              Online Payment
            </label>
          </div>
          {paymentType === "Online" && (
            <div className="qr-scanner">
              <p>Scan the QR Code to Proceed</p>
              <img className="qr" src="/qr.jpg" alt="QR Code" />
            </div>
          )}
          <button type="submit">PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
