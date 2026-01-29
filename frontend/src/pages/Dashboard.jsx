import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./Home.css";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/order/my-orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h2>My Orders</h2>

        {orders.length === 0 && <p>No orders found</p>}

        {orders.map((o) => (
          <div className="order-card" key={o._id}>
            <p><b>Order ID:</b> {o._id}</p>
            <p><b>Total:</b> ₹{o.total}</p>
            <p><b>Status:</b> {o.status}</p>

            {/* Progress Bar */}
            <div className="status-bar">
              <span className={o.status === "Pending" || o.status === "Approved" || o.status === "Dispatched" || o.status === "Delivered" ? "active" : ""}>Pending</span>
              <span className={o.status === "Approved" || o.status === "Dispatched" || o.status === "Delivered" ? "active" : ""}>Approved</span>
              <span className={o.status === "Dispatched" || o.status === "Delivered" ? "active" : ""}>Dispatched</span>
              <span className={o.status === "Delivered" ? "active" : ""}>Delivered</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
