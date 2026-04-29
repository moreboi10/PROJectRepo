const express = require("express");
const cors = require("cors");
const leadRoutes = require("./routes/leadRoutes");
const pool = require("./db");

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

// Routes
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// DB Connection Test
pool.connect()
  .then(() => console.log("PostgreSQL Connected"))
  .catch(err => console.error("Connection Error", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});