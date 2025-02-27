import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderPlaced.css";

const OrderPlaced = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect back to home after 3 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="order-placed-container">
      <div className="order-animation">
        <div className="checkmark">&#10004;</div>
      </div>
      <h2>Order Placed Successfully!</h2>
      <p>Redirecting to homepage...</p>
    </div>
  );
};

export default OrderPlaced;
