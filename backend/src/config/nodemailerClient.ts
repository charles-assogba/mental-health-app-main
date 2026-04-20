import nodemailer from "nodemailer";
import * as env from "dotenv";

env.config();

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "aran8276@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});
