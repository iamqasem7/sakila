"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const filmController_1 = require("../controllers/filmController");
const router = (0, express_1.Router)();
// Existing films route
router.get('/', filmController_1.getFilms);
// New store revenue route
router.get('/avilable', filmController_1.getAvailable);
exports.default = router;
