import express from "express";

const app = express();

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Hello from VPS 🚀");
});

// New Route 1 → Health check (VERY IMPORTANT in real apps)
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    time: new Date(),
  });
});

// New Route 2 → Dynamic route (params)
app.get("/user/:name", (req, res) => {
  const { name } = req.params;
  res.send(`Hello ${name} 👋`);
});

// New Route 3 → POST request (real backend concept)
app.post("/data", (req, res) => {
  const data = req.body;
  res.json({
    message: "Data received ✅",
    data,
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});