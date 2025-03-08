import express from "express";
import { generateSignedUrl } from "../controllers/signedUrl.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, generateSignedUrl);

export default router;
