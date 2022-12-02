import React from "react";
import { Link } from "react-router-dom";

const OrderValidation = () => {
  return (
    <div>
      <h3>Thank you for your order!</h3>
      <p>
        You can see<Link to="/profile">your order history here</Link>
      </p>
    </div>
  );
};

export default OrderValidation;
