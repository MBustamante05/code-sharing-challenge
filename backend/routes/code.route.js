import express from "express";
const router = express.Router();

import { shareCode, getCode } from "../controllers/code.controller.js";

router.get("/:id", getCode);
router.post("/", shareCode);

export default router;