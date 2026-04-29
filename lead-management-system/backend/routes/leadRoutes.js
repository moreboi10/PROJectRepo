const express = require("express");
const router = express.Router();
const leadController = require("../controllers/leadController");

router.post("/add", leadController.addLead);
router.get("/", leadController.getLeads);
router.put("/update/:id", leadController.updateLeadStatus);
router.delete("/delete/:id", leadController.deleteLead);

module.exports = router;