"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quote_controller_1 = __importDefault(require("../controllers/quote.controller"));
const router = (0, express_1.Router)();
router.get('/', quote_controller_1.default.getQuotes);
router.get('/:id', quote_controller_1.default.getQuote);
router.post('/', quote_controller_1.default.postQuote);
router.patch('/:id', quote_controller_1.default.patchQuote);
router.delete('/:id', quote_controller_1.default.deleteQuote);
router.post('/:id/like', quote_controller_1.default.likeQuote);
exports.default = router;
//# sourceMappingURL=quote.route.js.map