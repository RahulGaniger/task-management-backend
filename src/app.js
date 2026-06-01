const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://task-management-frontend-ipyt.vercel.app",
    ],
    credentials: true,
  })
);

// MUST BE BEFORE ROUTES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "client/build")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;