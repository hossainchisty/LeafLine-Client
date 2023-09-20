/* eslint-disable react-hooks/exhaustive-deps */
import { FaCartPlus } from "react-icons/fa";
import { useCartItemCount } from "../../context/CartItemCountContext";

const CartCounter = () => {
  const { cartItemCount } = useCartItemCount();

  return (
    <div>
      <FaCartPlus className="mr-3" />
      {cartItemCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
          {cartItemCount}
        </span>
      )}
    </div>
  );
};

export default CartCounter;
