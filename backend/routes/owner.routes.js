import express from "express";
import { Store, Rating } from "../models/index.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/roles.js";

const router = express.Router();

router.use(authenticate, authorize("OWNER"));

// Owner dashboard
router.get("/dashboard", async (req, res) => {
    const stores = await Store.findAll({
        where: { ownerId: req.user.id },
        include: Rating
    });
    res.json(stores);
});

export default router;
