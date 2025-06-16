import { Router } from "express";
import { getFilms, getAvailable } from "../controllers/filmController";

const router = Router();

// Existing films route
router.get("/", getFilms);

// New store revenue route
router.get("/available", getAvailable);

export default router;
