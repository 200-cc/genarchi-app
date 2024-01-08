import { Router } from 'express';
import QuoteController from "../controllers/quote.controller";

const router = Router();

router.get('/', QuoteController.getQuotes);
router.get('/:id', QuoteController.getQuote);
router.post('/', QuoteController.postQuote);
router.patch('/:id', QuoteController.patchQuote);
router.delete('/:id', QuoteController.deleteQuote);
router.post('/:id/like', QuoteController.likeQuote);
export default router;