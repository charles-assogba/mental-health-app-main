var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as env from "dotenv";
import { prisma } from "../config/prismaClient.js"; // Adjust path if needed
env.config();
const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_TOKEN_EXPIRY = (process.env.JWT_ACCESS_TOKEN_EXPIRY ||
    "15m");
const REFRESH_TOKEN_EXPIRY = (process.env.JWT_REFRESH_TOKEN_EXPIRY ||
    "7d");
const SALT_ROUNDS = 10; // Same as used for password hashing
if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    console.error("FATAL ERROR: JWT Secret keys are not defined in .env file.");
    process.exit(1); // Exit if secrets aren't set
}
export const generateAccessToken = (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    });
};
export const generateRefreshToken = (payload) => {
    // Generate the actual token
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
    });
    return refreshToken;
};
export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    }
    catch (error) {
        console.error("Invalid access token:", error); // Log specific error if needed
        return null;
    }
};
export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    }
    catch (error) {
        console.error("Invalid refresh token:", error);
        return null;
    }
};
/**
 * Stores the HASHED refresh token in the database for the user.
 */
export const storeRefreshToken = (userId, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedRefreshToken = yield bcrypt.hash(refreshToken, SALT_ROUNDS);
        yield prisma.user.update({
            where: { id: userId },
            data: { hashedRefreshToken: hashedRefreshToken },
        });
        return true;
    }
    catch (error) {
        console.error(`Error storing refresh token for user ${userId}:`, error);
        return false;
    }
});
/**
 * Validates if the provided refresh token matches the hashed one stored for the user.
 */
export const validateStoredRefreshToken = (userId, providedRefreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: { id: userId },
            select: { hashedRefreshToken: true },
        });
        if (!user || !user.hashedRefreshToken) {
            console.warn(`No stored refresh token found for user ${userId} during validation.`);
            return false; // No stored token or user doesn't exist
        }
        return yield bcrypt.compare(providedRefreshToken, user.hashedRefreshToken);
    }
    catch (error) {
        console.error(`Error validating stored refresh token for user ${userId}:`, error);
        return false;
    }
});
/**
 * Removes the stored refresh token hash for the user (logout).
 */
export const removeRefreshToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.user.update({
            where: { id: userId },
            data: { hashedRefreshToken: null },
        });
        return true;
    }
    catch (error) {
        console.error(`Error removing refresh token for user ${userId}:`, error);
        return false;
    }
});
