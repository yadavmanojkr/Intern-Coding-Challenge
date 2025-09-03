import express from "express";
import { Store, Rating } from "../models/index.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.use(authenticate);

// Get all stores + ratings
router.get("/", async (req, res) => {
    const stores = await Store.findAll({ include: Rating });
    res.json(stores);
});

// Submit or modify rating
router.post("/:id/rating", async (req, res) => {
    const { value } = req.body;
    const [rating, created] = await Rating.findOrCreate({
        where: { userId: req.user.id, storeId: req.params.id },
        defaults: { value }
    });
    if (!created) {
        rating.value = value;
        await rating.save();
    }
    res.json(rating);
});

export default router;
