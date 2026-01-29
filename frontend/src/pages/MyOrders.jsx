import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./MyOrders.css";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/order/my-orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="orders-container">
        <h2> My Orders</h2>

        {orders.length === 0 && (
          <p className="empty-orders">You have not placed any order yet.</p>
        )}

        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <span><b>Order ID:</b> {order._id}</span>
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            <p><b>Total:</b> ₹ {order.total}</p>
            <p><b>Address:</b> {order.address}</p>

           
            <div className="products">
              <b>Products:</b>
              {order.products.map((p, i) => (
              <div key={i} className="product-row">
                <span className="product-name">{p.name}</span>
                <span className="product-price">₹ {p.price}</span>
                </div>
                ))}
                </div>


            {/* Progress Bar */}
            <div className="progress">
              <div className={`step ${order.status === "Pending" || order.status === "Approved" || order.status === "Dispatched" || order.status === "Delivered" ? "active" : ""}`}>Pending</div>
              <div className={`step ${order.status === "Approved" || order.status === "Dispatched" || order.status === "Delivered" ? "active" : ""}`}>Approved</div>
              <div className={`step ${order.status === "Dispatched" || order.status === "Delivered" ? "active" : ""}`}>Dispatched</div>
              <div className={`step ${order.status === "Delivered" ? "active" : ""}`}>Delivered</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
