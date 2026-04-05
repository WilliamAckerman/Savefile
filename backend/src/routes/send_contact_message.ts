import express, { type Request, type Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { verifySolution } from 'altcha-lib';

dotenv.config();

const sendContactMessageRouter = express.Router();
const jsonParser = bodyParser.json();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_APP_PASSWORD
    }
})

const validateMessagePart = (part: string | null, errorMessage: string, errorArray: string[]) => {
    if (part == null || part?.trim() == "") {
        errorArray.push(errorMessage)
    }
}

sendContactMessageRouter.post('/', jsonParser, async (_req: Request, res: Response) => {
    const name: string | null = _req.body?.name ? String(_req.body.name) : null;
    const email: string | null = _req.body?.email ? String(_req.body.email) : null;
    const subject: string | null = _req.body?.subject ? String(_req.body.subject) : null;
    const message: string | null =  _req.body?.message ? String(_req.body.message) : null;
    const agree: string | null = _req.body?.agree ? String(_req.body.agree) : null;

    const errors: string[] = [];

    validateMessagePart(name, "No name was provided.", errors);
    validateMessagePart(email, "No email was provided.", errors);
    validateMessagePart(subject, "No subject was provided.", errors);
    validateMessagePart(message, "No message body was provided.", errors);

    if (agree !== "true") {
        errors.push("User did not indicate that they agree to Savefile's guidelines and Privacy Policy.");
    }

    if (errors.length > 0) {
        res.status(400).json({
            success: false,
            error: 'Failed to send message:',
            errorArray: errors
        })
    }

    /*if (process.env.ALTCHA_HMAC_KEY == undefined) {
        res.status(500).json({
            success: false,
            error: 'Failed to execute Altcha functionality.'
        })
    };

    const ok = await verifySolution(
        _req.body.altcha,
        process.env.ALTCHA_HMAC_KEY!
    )

    if (!ok) {
        res.json({
            success: false,
            'error': 'Altcha challenge failed.'
        })
    }*/

    try {
        const info = await transporter.sendMail({
            from: `${name} <${process.env.GOOGLE_USER}>`,
            replyTo: `${email}`,
            to: process.env.GOOGLE_USER,
            subject: `Savefile: ${subject}`,
            text: `${message}`
        });

        res.status(200).json({
            success: true,
            message: 'Message sent successfully!'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error occurred while trying to send a message: ${error}`
        });
    }
})

export { sendContactMessageRouter }