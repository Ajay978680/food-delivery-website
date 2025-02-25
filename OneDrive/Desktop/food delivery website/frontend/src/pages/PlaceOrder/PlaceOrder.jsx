import { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
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

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      firstName: data.firstName,
      lastName: data.lastName,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    // Assuming order API call here
    // const response = await axios.post(url + "/api/order/create", orderData, { headers: { token } });
    // const { orderId, razorpayOrder } = response.data;
    // initiatePayment(razorpayOrder, orderId);
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onchangeHandler} value={data.firstName} type="text" placeholder="First Name" />
          <input required name="lastName" onChange={onchangeHandler} value={data.lastName} type="text" placeholder="Last name" />
        </div>
        <input required name="email" onChange={onchangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input required name="street" onChange={onchangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" onChange={onchangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onchangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onchangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" />
          <input required name="country" onChange={onchangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required name="phone" onChange={onchangeHandler} value={data.phone} type="text" placeholder="Phone" />
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
              <img className='qr' src="/qr.jpg" alt="QR Code" />
            </div>
          )}
          <button onClick={() => navigate("payment")}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;