import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext"; // Adjust this based on your context file path

const Payment = () => {
    const { addOrder, getTotalCartAmount, cartItems, food_list, token, orders } = useContext(StoreContext);
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        // Ensure the cart is not empty
        if (Object.keys(cartItems).length === 0) {
            alert("Your cart is empty.");
            return;
        }

        try {
            setLoading(true);
            // Trigger the addOrder function to create an order and get Razorpay payment details
            await addOrder();
        } catch (error) {
            setLoading(false);
            console.error("Error during payment initiation", error);
            alert("There was an issue with processing the payment. Please try again.");
        }
    };

    const renderCartItems = () => {
        return food_list.map((item) => {
            if (cartItems[item._id]) {
                return (
                    <div key={item._id} className="cart-item">
                        <p>{item.name} - {cartItems[item._id]} x ₹{item.price}</p>
                    </div>
                );
            }
            return null;
        });
    };

    return (
        <div className="payment-container">
            <h2>Review Your Cart</h2>
            <div className="cart-details">
                {renderCartItems()}
                <div className="total-amount">
                    <p>Total: ₹{getTotalCartAmount()}</p>
                </div>
            </div>

            <button onClick={handlePayment} disabled={loading}>
                {loading ? "Processing Payment..." : "Pay Now"}
            </button>
        </div>
    );
};

export default Payment;
