import { msgTemplate } from "@/config/msgTemplate.js";
import { prisma } from "@/config/prismaClient.js";
import { Request, Response } from "express";
import {
    addressValidation,
    personalInfoValidation,
} from "./user.validation.js";
import { RequestWithUser } from "@/middleware/authMiddleware.type";
import {
    validateRequestBody,
    handleControllerError,
    parseNumericId,
    commonUserOmit,
} from "@/utils/crud.utils.js";
import { Prisma } from "@prisma/client";

const commonUserInclude = Prisma.validator<Prisma.UserInclude>()({
    threads: true,
    thread_comments: true,
});

const userController = {
    /**
     * @description Update the user personal information
     * @route POST /api/user/personal-info
     * @access Private (Requires authenticated user to update their profile info)
     */
    updatePersonalInfo: async (req: RequestWithUser, res: Response) => {
        const userId = req.user!.id;

        const dataToValidate = {
            ...req.body,
        };

        if (!validateRequestBody(req, res, personalInfoValidation)) {
            return;
        }

        try {
            const personalInfo = await prisma.user.update({
                data: {
                    name: dataToValidate.name,
                    email: dataToValidate.email,
                    phone_number: dataToValidate.phone_number,
                    gender: dataToValidate.gender,
                    bio: dataToValidate.bio,
                },

                where: {
                    id: userId,
                },
            });

            res.json(
                msgTemplate("Info pribadi berhasil diupdate.", {
                    ...personalInfo,
                }),
            );
        } catch (error) {
            handleControllerError(res, error, "Gagal mengedit info pribadi.");
        }
    },

    /**
     * @description Update the user address information
     * @route POST /api/user/address-info
     * @access Private (Requires authenticated user to update their profile info)
     */
    updateAddressInfo: async (req: RequestWithUser, res: Response) => {
        const userId = req.user!.id;

        const dataToValidate = {
            ...req.body,
        };

        if (!validateRequestBody(req, res, addressValidation)) {
            return;
        }

        try {
            const addressInfo = await prisma.user.update({
                data: {
                    country: dataToValidate.country,
                    province: dataToValidate.province,
                    city: dataToValidate.city,
                    street: dataToValidate.street,
                    postal: dataToValidate.postal,
                },

                where: {
                    id: userId,
                },
            });

            res.json(
                msgTemplate("Info lokasi berhasil diupdate.", addressInfo),
            );
        } catch (error) {
            handleControllerError(res, error, "Gagal mengedit info lokasi.");
        }
    },

    /**
     * @description Get information of the user given by the id.
     * @route GET /api/user/:id
     * @access Public (anyone can access it)
     */
    readUser: async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 5;
        const skip = (page - 1) * limit;

        try {
            const users = await prisma.user.findMany({
                skip: skip,
                take: limit,
                orderBy: {
                    thread_comments: {
                        _count: "desc",
                    },
                },
                include: {
                    _count: true,
                },
                omit: commonUserOmit,
            });

            const totalUsers = await prisma.thread.count();

            res.json(
                msgTemplate("User berhasil diambil.", {
                    users: users,
                    pagination: {
                        currentPage: page,
                        totalPages: Math.ceil(totalUsers / limit),
                        totalUsers: totalUsers,
                        limit,
                    },
                }),
            );
        } catch (error) {
            handleControllerError(res, error, "Gagal mengambil threads.");
        }
    },

    /**
     * @description Get information of the user given by the id.
     * @route GET /api/user/:id
     * @access Public (anyone can access it)
     */
    readUserById: async (req: Request, res: Response) => {
        const userId = parseNumericId(req, res);
        if (userId === null) return;

        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: commonUserInclude,
            });

            if (!user) {
                res.status(404).json(msgTemplate("User tidak ditemukan."));
                return;
            }

            res.json(msgTemplate("User berhasil diambil.", user));
        } catch (error) {
            handleControllerError(res, error, "Gagal mengambil User.");
        }
    },

    /**
     * @description Get information of the current user that's logged in
     * @route GET /api/user/
     * @access Private (Requires authenticated user to see their profile inforamtion)
     */
    readCurrentUser: async (req: RequestWithUser, res: Response) => {
        const userId = req.user!.id;

        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: commonUserInclude,
                omit: commonUserOmit,
            });

            if (!user) {
                res.status(404).json(msgTemplate("User tidak ditemukan."));
                return;
            }

            res.json(msgTemplate("User berhasil diambil.", user));
        } catch (error) {
            handleControllerError(res, error, "Gagal mengambil User.");
        }
    },
};

export default userController;
