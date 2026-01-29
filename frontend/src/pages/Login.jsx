import "./Auth.css";
import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
  
      console.log("Full response:", res.data);
      console.log("Role:", res.data.user.role);   // 🔴 yahan change
  
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role); // 🔴 yahan bhi change
  
      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
  
    } catch (err) {
      console.log("Login error:", err.response?.data);
      alert(err.response?.data?.msg || "Login failed");
    }
  };
  
  
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back!</h2>

        <div className="banner">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
            alt="medicine"
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="switch-text">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
