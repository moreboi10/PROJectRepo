const pool = require("../db");

// ➕ Add Lead
exports.addLead = async (req, res) => {
  try {
    const { name, phone, source } = req.body;

    const newLead = await pool.query(
      "INSERT INTO leads (name, phone, source) VALUES ($1, $2, $3) RETURNING *",
      [name, phone, source]
    );

    res.json(newLead.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// 📥 Get All Leads
exports.getLeads = async (req, res) => {
  try {
    const allLeads = await pool.query("SELECT * FROM leads ORDER BY id DESC");
    res.json(allLeads.rows);
  } catch (err) {
    console.error(err.message);
  }
};

// 🔄 Update Lead Status
exports.updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await pool.query(
      "UPDATE leads SET status = $1 WHERE id = $2",
      [status, id]
    );

    res.json("Lead status updated");
  } catch (err) {
    console.error(err.message);
  }
};

// ❌ Delete Lead
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM leads WHERE id = $1", [id]);

    res.json("Lead deleted");
  } catch (err) {
    console.error(err.message);
  }
};