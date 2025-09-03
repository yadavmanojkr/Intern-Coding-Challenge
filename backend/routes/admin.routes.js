import express from "express";
import bcrypt from "bcrypt";
import { User, Store, Rating } from "../models/index.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/roles.js";

const router = express.Router();

router.use(authenticate, authorize("ADMIN"));

// Dashboard counts
router.get("/dashboard", async (req, res) => {
    const users = await User.count();
    const stores = await Store.count();
    const ratings = await Rating.count();
    res.json({ users, stores, ratings });
});

// Add user
router.post("/users", async (req, res) => {
    const { name, email, address, role, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, address, role, passwordHash: hash });
    res.json(user);
});

// Add store
router.post("/stores", async (req, res) => {
    const store = await Store.create(req.body);
    res.json(store);
});

export default router;
