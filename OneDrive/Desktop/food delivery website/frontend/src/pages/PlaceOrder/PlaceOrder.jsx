import { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

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
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { orderId, razorpayOrder } = response.data;
        initiatePayment(razorpayOrder, orderId);
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error during placing order:", error.response?.data || error.message);
      alert("An error occurred. Please try again later.");
    }
  };

  const initiatePayment = (razorpayOrder, orderId) => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "Your Store",
      description: "Order Payment",
      order_id: razorpayOrder.id,
      handler: async function (response) {
        try {
          const verifyResponse = await axios.post(
            url + "/api/order/verify-payment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: orderId,
            },
            { headers: { token } }
          );

          if (verifyResponse.data.success) {
            alert("Payment Successful!");
            window.location.href = "/order-success";
          } else {
            alert("Payment verification failed!");
          }
        } catch (error) {
          console.error("Payment verification error:", error);
          alert("An error occurred during payment verification.");
        }
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onchangeHandler} value={data.firstName} type="text" placeholder="First Name" />
          <input required name="lastName" onChange={onchangeHandler} value={data.lastName} type="text" placeholder="Last name" />
        </div>
        <input required name="email" onChange={onchangeHandler} value={data.email} type="Email" placeholder="Email address" />
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
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
