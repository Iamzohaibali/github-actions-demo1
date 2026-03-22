import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev")); // logging

// Versioned routes
const router = express.Router();

// Health check
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    time: new Date(),
  });
});

// Dynamic route
router.get("/user/:name", (req, res) => {
  const { name } = req.params;
  res.send(`Hello ${name} 👋`);
});

// POST route
router.post("/data", (req, res) => {
  const data = req.body;

  if (!data.name) {
    throw new Error("Name is required"); // trigger error middleware
  }

  res.json({
    message: "Data received ✅",
    data,
  });
});

// Attach versioned API
app.use("/api/v1", router);

// Root route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ❌ 404 handler (must be after routes)
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// 🔥 Error handling middleware (VERY IMPORTANT)
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});