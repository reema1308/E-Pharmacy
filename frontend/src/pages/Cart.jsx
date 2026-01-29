import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const removeItem = (index) => {
    let newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  return (
    <>
      <Navbar />
      <div className="cart-container">
        {/* Left side */}
        <div className="cart-left">
          <h2>Your Cart</h2>

          {cart.length === 0 && <p>Your cart is empty</p>}

          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} />

              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>₹ {item.price}</p>
              </div>

              <button onClick={() => removeItem(index)}>Remove</button>
            </div>
          ))}
        </div>

        {/* Right side */}
        <div className="cart-right">
          <h3>Bill Summary</h3>
          <div className="bill-row">
            <span>Subtotal</span>
            <span>₹ {getTotal()}</span>
          </div>
          <div className="bill-row">
            <span>Delivery</span>
            <span>₹ 40</span>
          </div>
          <div className="bill-row total">
            <span>Total</span>
            <span>₹ {getTotal() + 40}</span>
          </div>

          <button 
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
