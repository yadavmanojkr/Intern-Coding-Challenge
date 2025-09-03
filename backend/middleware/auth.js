import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "Unauthorized" });

    const token = auth.split(" ")[1];
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
}
