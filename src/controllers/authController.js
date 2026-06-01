const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      console.warn("Register: missing email or password", { email, password });
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail
      }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(String(password), 10);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword
      }
    });

    return res.status(201).json({
      message: "User created successfully",
      userId: user.id
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {

    const { email, password } = req.body || {};

    if (!email || !password) {
      console.warn("Login: missing email or password", { email, password });
      return res.status(400).json({ message: "Email and password required" });
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail
      }
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const isPasswordValid = await bcrypt.compare(String(password), user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured in environment");
      return res.status(500).json({ message: "Server misconfiguration: JWT secret missing" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    return res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

module.exports = {
  register,
  login
};