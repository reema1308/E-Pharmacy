import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./Checkout.css";

export default function Checkout() {
  const [address, setAddress] = useState("");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const placeOrder = async () => {
    if (!address) {
      alert("Please enter delivery address");
      return;
    }

    try {
      await API.post("/order/create", {
        products: cart,
        address,
        total
      });

      alert(" Order placed successfully!");
      localStorage.removeItem("cart");
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Error placing order");
    }
  };

  return (
    <>
      <Navbar />
      <div className="checkout-container">
        <h2 className="checkout-title"> Checkout</h2>

        <div className="checkout-layout">
          {/* Address Box */}
          <div className="checkout-box">
            <h3>Delivery Address</h3>
            <textarea
              placeholder="Enter your full address (House no, Area, City, Pin code)..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Order Summary Box */}
          <div className="checkout-box">
            <h3>Order Summary</h3>

            {cart.map((item, i) => (
              <div className="summary-item" key={i}>
                <span>{item.name}</span>
                <span>₹ {item.price}</span>
              </div>
            ))}

            <div className="summary-total">
              <span>Total</span>
              <span>₹ {total}</span>
            </div>

            <button className="place-btn" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
