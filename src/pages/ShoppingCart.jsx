// ShoppingCart.js

import React, { useState } from "react";

const ShoppingCart = ({ cartItems, updateCart }) => {
  // Component state to manage item quantities
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, quantity) => {
    // Update the quantities in state
    setQuantities({ ...quantities, [productId]: quantity });

    // Update the cart on the server
    updateCart({ productId, quantity });
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.productId}>
            {item.productName} - Quantity:{" "}
            <input
              type="number"
              value={quantities[item.productId] || 1}
              onChange={(e) =>
                handleQuantityChange(item.productId, e.target.value)
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;
