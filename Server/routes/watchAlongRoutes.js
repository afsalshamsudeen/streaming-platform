import express from "express";
import { createRoom, joinRoom, getRoomDetails, endRoom } from "../controllers/watchAlongController.js";
import { verifyToken } from "../verifyToken.js"; // Middleware to check if user is authenticated

const router = express.Router();

// Route to create a new WatchAlong room
router.post("/create", verifyToken, createRoom);

// Route to join an existing WatchAlong room
router.post("/join/:roomCode", verifyToken, joinRoom);

// Route to get room details by room code
router.get("/:roomCode", verifyToken, getRoomDetails);

// Route to end a room (optional, if you want to mark rooms as inactive)
router.patch("/end/:roomCode", verifyToken, endRoom);

export default router;
