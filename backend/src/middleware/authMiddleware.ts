// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, TokenPayload } from "@/services/tokenService.js"; // Adjust path

export interface RequestWithUser extends Request {
    user?: TokenPayload;
}

const authenticateToken = (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
): void => {
    // Explicitly void return type
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
        // Send response and exit
        res.status(401).json({
            message: "Akses Ditolak. Token tidak ditemukan.",
        });
        return; // Use return; for early exit
    }

    const payload = verifyAccessToken(token);

    if (payload) {
        // Token is valid, attach user and proceed
        req.user = { id: payload.id };
        next(); // Call next middleware/handler
        return; // Signal completion of this middleware's path
    } else {
        // Token is invalid (could be expired, malformed, wrong signature)
        // Send a generic "forbidden" or "unauthorized" response
        // You could try to distinguish expired here if needed (see Option 2)
        res.status(403).json({
            message: "Token tidak valid atau kedaluwarsa.",
        });
        // Consider 401 if you prefer that status code for invalid/expired tokens
        // res.status(401).json({ message: "Token tidak valid atau kedaluwarsa." });
        return; // Use return; for early exit
    }
};

export default authenticateToken;
