import express, { type Request, type Response } from 'express';
import { createChallenge } from 'altcha-lib';
import dotenv from 'dotenv';

dotenv.config();

const altchaChallengeRouter = express.Router();

altchaChallengeRouter.get('/', async (_req: Request, res: Response) => {
    if (!process.env.ALTCHA_HMAC_KEY) {
        /*res.status(500).json({
            success: false,
            error: 'Failed to execute Altcha challenge.'
        })*/
       return res.status(500).send('Failed to execute Altcha challenge.');
    }

    const HMAC_KEY = process.env.ALTCHA_HMAC_KEY!

    try {
        const challenge = await createChallenge({
            hmacKey: HMAC_KEY,
            maxNumber: 100000
        })

        return res.status(200).json({
            challenge: challenge
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Failed to execute Altcha challenge: ${error}`
        })
    }
})

export { altchaChallengeRouter }