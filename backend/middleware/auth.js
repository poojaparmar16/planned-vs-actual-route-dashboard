import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];
    try {
        jwt.verify(token, "rytles-secret-key");
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}
