import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; 
import https from "https";
import cron from "node-cron";

import productRoutes from "./routes/productRoutes.js";
import contributionRoutes from "./routes/contributionRoutes.js"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/ping", (req, res) => {
  console.log("Ping endpoint hit");
  res.status(200).send("Pong");
});

// cron.schedule("*/10 * * * *", () => {
//   https
//     .get("https://crowdfunding-backend-3wkh.onrender.com/ping", (res) => {
//       console.log(`Pinged server, status code: ${res.statusCode}`);
//     })
//     .on("error", (err) => {
//       console.error("Error pinging server:", err);
//     });
// });

app.use("/api/products", productRoutes);
app.use("/api/contributions", contributionRoutes); 

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
