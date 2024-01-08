import express from 'express';

// Import route
import quoteRoute from "./quote.route";

// Create router
export const router = express.Router();

// Use route
router.use('/api/quote', quoteRoute)

export default router;
