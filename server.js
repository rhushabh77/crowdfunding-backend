import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; // Import CORS middleware

import productRoutes from "./routes/productRoutes.js";
import contributionRoutes from "./routes/contributionRoutes.js"; // Import your contribution routes

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

app.use("/api/products", productRoutes);
app.use("/api/contributions", contributionRoutes); // Use the contribution routes here

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
