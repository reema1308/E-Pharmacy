import "./Home.css";
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");   // 🔍 search state

  useEffect(() => {
    API.get("/product/all")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
  };

  // 🔍 Category + Search dono ke basis par filter
  const filteredProducts = products.filter((p) => {
    const matchCategory = category === "all" || p.category === category;
    const matchSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />


      <div className="home-container">

        {/* Banner */}
        <div className="banner">
          <div className="banner-text">
            <h1>Flat 25% OFF</h1>
            <p>on your first order!</p>
            <button>Shop Now</button>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
            alt="banner"
          />
        </div>

        {/* Categories */}
        <div className="categories">
          <div
            className={`cat ${category === "all" ? "active" : ""}`}
            onClick={() => setCategory("all")}
          >
            All
          </div>

          <div
            className={`cat ${category === "tablet" ? "active" : ""}`}
            onClick={() => setCategory("tablet")}
          >
            Tablets
          </div>

          <div
            className={`cat ${category === "syrup" ? "active" : ""}`}
            onClick={() => setCategory("syrup")}
          >
            Syrup
          </div>

          <div
            className={`cat ${category === "baby" ? "active" : ""}`}
            onClick={() => setCategory("baby")}
          >
            Baby Care
          </div>

          <div
            className={`cat ${category === "device" ? "active" : ""}`}
            onClick={() => setCategory("device")}
          >
            Devices
          </div>
        </div>

        {/* Products */}
        <h2 className="section-title">
          {category === "all" ? "All Medicines" : category.toUpperCase()}
        </h2>

        <div className="product-grid">
          {filteredProducts.length === 0 && (
            <p style={{ textAlign: "center", width: "100%" }}>
              No products found
            </p>
          )}

          {filteredProducts.map((p) => (
            <div className="product-card" key={p._id}>
              <span className="discount">20% OFF</span>
              <img
                src={
                  p.image ||
                  "https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
                }
                alt={p.name}
              />
              <h3>{p.name}</h3>
              <p className="price">₹{p.price}</p>
              <p style={{ fontSize: "12px", color: "#888" }}>
                {p.category}
              </p>
              <button onClick={() => addToCart(p)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
