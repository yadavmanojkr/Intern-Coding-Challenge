import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { User } from "../models/index.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Signup (Normal User)
router.post("/signup",
    body("name").isLength({ min: 20, max: 60 }),
    body("email").isEmail(),
    body("address").isLength({ max: 400 }),
    body("password").isLength({ min: 8, max: 16 }).matches(/[A-Z]/).matches(/[^A-Za-z0-9]/),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const { name, email, address, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, address, passwordHash: hash, role: "USER" });
        res.json(user);
    }
);

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, role: user.role });
});

// Change Password
router.put("/change-password", authenticate, async (req, res) => {
    const { currentPassword, password } = req.body;
    const user = await User.findByPk(req.user.id);
    const ok = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!ok) return res.status(400).json({ message: "Wrong current password" });
    user.passwordHash = await bcrypt.hash(password, 10);
    await user.save();
    res.json({ message: "Password updated" });
});

export default router;
