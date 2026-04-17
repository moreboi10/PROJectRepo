const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");

router.get("/dashboard", controller.getDashboard);

router.post("/", controller.createOrder);
router.get("/", controller.getOrders);
router.patch("/:id/status", controller.updateStatus);

module.exports = router;