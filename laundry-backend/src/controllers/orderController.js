const service = require("../services/orderService");

exports.createOrder = (req, res) => {
  try {
    const order = service.createOrder(req.body);
    res.json(order);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getOrders = (req, res) => {
  const orders = service.getOrders(req.query);
  res.json(orders);
};

exports.updateStatus = (req, res) => {
  try {
    const order = service.updateStatus(req.params.id, req.body.status);
    res.json(order);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getDashboard = (req, res) => {
  console.log("Dashboard API HIT"); // 👈 ADD THIS
  res.json(service.getDashboard());
};