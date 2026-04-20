import { msgTemplate } from "../config/msgTemplate.js";
import { Prisma } from "@prisma/client";
import { make } from "simple-body-validator";
/**
 * Parses and validates the ID from request parameters.
 * Sends a 400 response if the ID is invalid.
 */
const parseNumericId = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json(msgTemplate("Invalid ID provided. ID must be a number."));
        return null;
    }
    else {
        return id;
    }
};
/**
 * Handles request body validation using simple-body-validator.
 * Sends a 422 response if validation fails.
 * Returns true if validation passes, false otherwise.
 */
const validateRequestBody = (req, res, rules) => {
    const validator = make(req.body, rules);
    if (!validator.validate()) {
        res.status(422).json(msgTemplate("Validation failed. Please check your input.", validator.errors().all()));
        return false;
    }
    return true;
};
/**
 * Standard error handler for controller actions.
 * Logs the error and sends an appropriate response.
 */
const handleControllerError = (res, error, defaultMessage = "An unexpected error occurred") => {
    console.error("Controller Error:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
            res.status(409).json(msgTemplate("Conflict: Resource already exists or violates constraints.", { code: error.code }));
            return;
        }
    }
    if (error instanceof Error) {
        res.status(400).json(msgTemplate(defaultMessage, {
            error: error.message.replace(/[\r\n]+/g, " "),
        }));
    }
    else {
        res.status(500).json(msgTemplate(defaultMessage, { error: "Unknown error structure" }));
    }
};
export const commonUserOmit = Prisma.validator()({
    email_verified_at: true,
    password: true,
    hashedRefreshToken: true,
});
export { parseNumericId, validateRequestBody, handleControllerError };
