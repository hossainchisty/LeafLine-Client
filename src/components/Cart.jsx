/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";

const Cart = ({ cart, setCart }) => {

  
  return (
    <div className="container">
      <h2>Your Cart</h2>
      <ul>
        
      </ul>
    </div>
  );
};

Cart.propTypes = {
      cart: PropTypes.string.isRequired,
      setCart: PropTypes.string.isRequired,
  
  };

export default Cart;
