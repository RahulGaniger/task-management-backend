const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const taskRoutes = require("./routes/taskRoutes");
const app = express();

app.use(cors());

// MUST BE BEFORE ROUTES
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple form to manually register users for testing
app.get("/register", (req, res) => {
	res.sendFile(path.resolve(__dirname, "views", "register.html"));
});

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;