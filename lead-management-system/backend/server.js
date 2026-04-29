const express = require("express");
const cors = require("cors");
const leadRoutes = require("./routes/leadRoutes");

const app = express();
const pool = require("./db");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});


pool.connect()
  .then(() => console.log("PostgreSQL Connected"))
  .catch(err => console.error("Connection Error", err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});