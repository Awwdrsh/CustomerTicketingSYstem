import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../config/index.js";

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

export async function register(req, res) {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: "Email already registered" });

  const user = await User.create({ name, email, password });
  const token = signToken(user);

  res.status(201).json({ token, user });
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid email or password" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

  const token = signToken(user);

  res.json({ token, user });
}

export async function getMe(req, res) {
  res.json(req.user);
}
