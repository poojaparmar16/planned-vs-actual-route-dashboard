import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const USERS = [
    { username: "admin", password: "admin123" }
];

const JWT_SECRET = process.env.JWT_SECRET || "rytles-secret-key";

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = USERS.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, JWT_SECRET, {
        expiresIn: "1h"
    });

    res.json({ token });
});

export default router;
