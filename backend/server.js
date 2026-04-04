import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// Connect DB & Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// ================= API ROUTES =================
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// Health check
app.get("/test-db", (req, res) => {
  const state = mongoose.connection.readyState;
  if (state === 1) {
    res.send("Database is connected");
  } else {
    res.status(500).send("Database is NOT connected");
  }
});

// ================= SERVE USER FRONTEND =================
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// ================= SERVE ADMIN PANEL =================
app.use("/admin", express.static(path.join(__dirname, "../admin/dist")));

// ================= SAFE FALLBACK (VERY IMPORTANT) =================
app.use((req, res) => {
  if (req.originalUrl.startsWith("/admin")) {
    return res.sendFile(
      path.join(__dirname, "../admin/dist/index.html")
    );
  }

  res.sendFile(
    path.join(__dirname, "../frontend/dist/index.html")
  );
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});