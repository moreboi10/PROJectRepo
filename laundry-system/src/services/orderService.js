const { v4: uuidv4 } = require("uuid");
const prices = require("../utils/pricing");

let orders = [];

const VALID_STATUSES = ["RECEIVED", "PROCESSING", "READY", "DELIVERED"];

function createOrder(data) {
  let total = 0;

  const garments = data.garments.map(g => {
    const price = prices[g.type] || 0;
    total += price * g.quantity;
    return { ...g, price };
  });

  const order = {
    id: uuidv4(),
    customerName: data.customerName,
    phone: data.phone,
    garments,
    totalAmount: total,
    status: "RECEIVED",
    createdAt: new Date()
  };

  orders.push(order);
  return order;
}

function getOrders(query) {
  return orders.filter(order => {
    if (query.status && order.status !== query.status) return false;
    if (query.phone && !order.phone.includes(query.phone)) return false;
    if (query.customerName && !order.customerName.toLowerCase().includes(query.customerName.toLowerCase())) return false;
    return true;
  });
}

function updateStatus(id, status) {
  if (!VALID_STATUSES.includes(status)) {
    throw new Error("Invalid status");
  }

  const order = orders.find(o => o.id === id);
  if (!order) throw new Error("Order not found");

  order.status = status;
  return order;
}

function getDashboard() {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const statusBreakdown = {};
  VALID_STATUSES.forEach(s => (statusBreakdown[s] = 0));

  orders.forEach(o => {
    statusBreakdown[o.status]++;
  });

  return { totalOrders, totalRevenue, statusBreakdown };
}

module.exports = {
  createOrder,
  getOrders,
  updateStatus,
  getDashboard
};