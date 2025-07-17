import express from 'express';
import periodicMail from '../controller/periodicMail.js';
const router = express.Router();

router.post('/sendPeriodic',periodicMail )

export default router;