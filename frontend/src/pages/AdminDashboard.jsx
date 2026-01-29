import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await API.get("/order/all");
    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/order/update/${id}`, { status });
    fetchOrders();
  };

  const totalOrders = orders.length;
  const pending = orders.filter(o => o.status === "Pending").length;
  const delivered = orders.filter(o => o.status === "Delivered").length;
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <>
    <div>
      <h1>Welcome Admin</h1>
      <p>This is Admin Dashboard</p>
    </div>
    
      <Navbar />
      <div className="admin-container">

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p>{pending}</p>
          </div>
          <div className="stat-card">
            <h3>Delivered</h3>
            <p>{delivered}</p>
          </div>
          <div className="stat-card">
            <h3>Revenue</h3>
            <p>₹ {revenue}</p>
          </div>
        </div>

        <h2>Admin Dashboard - Orders</h2>

        {orders.map((o) => (
          <div className="admin-order-card" key={o._id}>
            <div className="order-header">
              <span><b>Order ID:</b> {o._id}</span>
              <span className={`status ${o.status.toLowerCase()}`}>
                {o.status}
              </span>
            </div>

            <p><b>User ID:</b> {o.userId}</p>
            <p><b>Total:</b> ₹{o.total}</p>
            <p><b>Address:</b> {o.address}</p>

            <div>
              <b>Products:</b>
              {o.products.map((p, i) => (
                <div key={i} className="product-row">
                  {p.name} - ₹{p.price}
                </div>
              ))}
            </div>

            <div className="admin-actions">
              <button onClick={() => updateStatus(o._id, "Approved")}>Approve</button>
              <button onClick={() => updateStatus(o._id, "Dispatched")}>Dispatch</button>
              <button onClick={() => updateStatus(o._id, "Delivered")}>Deliver</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
