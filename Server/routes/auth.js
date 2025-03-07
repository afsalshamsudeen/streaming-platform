import express from "express";
import { googleAuth, signin, signup } from "../controllers/auth.js";

const router = express.Router();

//Create user
router.post("/signup", signup)

//Sign in
router.post("/signin", signin)
//Google AUTH
router.post("/google", googleAuth)



export default router;