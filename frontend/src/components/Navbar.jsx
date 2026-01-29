import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ search, setSearch }) {   // 👈 props add
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">E-Pharmacy</Link>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}   // 👈 connect search
        />
      </div>

      <div className="nav-links">
        <Link to="/cart">Cart</Link>
        <Link to="/my-orders">My Orders</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
