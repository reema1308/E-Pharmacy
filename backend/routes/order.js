const router = require("express").Router();
const Order = require("../models/Order");
const auth = require("../middleware/authMiddleware");

// Create order (User)
router.post("/create", auth, async (req, res) => {
  const order = new Order({
    userId: req.user.id,
    products: req.body.products,
    address: req.body.address,
    total: req.body.total
  });
  await order.save();
  res.json(order);
});

// User orders
router.get("/my-orders", auth, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});

// Admin – all orders
router.get("/all", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Update order status
router.put("/update/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
});

module.exports = router;
