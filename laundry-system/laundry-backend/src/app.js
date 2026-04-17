const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

// ✅ Middleware FIRST
app.use(cors());
app.use(express.json());

// ✅ Routes AFTER middleware

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/orders", orderRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});