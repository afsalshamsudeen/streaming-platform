import Room from "../Models/Room.js";
import { createError } from "../error.js";

// Controller for creating a new room
export const createRoom = async (req, res, next) => {
    const { videoLink } = req.body;
    const roomCode = Math.random().toString(36).substring(2, 7); // Generate random room code

    try {
        const newRoom = new Room({
            roomCode,
            videoLink,
            createdBy: req.user.id,
            participants: [req.user.id]
        });
        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
    } catch (err) {
        next(err);
    }
};

// Controller for joining an existing room
export const joinRoom = async (req, res, next) => {
    const { roomCode } = req.params;

    try {
        const room = await Room.findOne({ roomCode });
        if (!room) return next(createError(404, "Room not found"));

        // Add the user to the participants array if they're not already in it
        if (!room.participants.includes(req.user.id)) {
            room.participants.push(req.user.id);
            await room.save();
        }

        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
};

// Controller for getting room details
export const getRoomDetails = async (req, res, next) => {
    const { roomCode } = req.params;

    try {
        const room = await Room.findOne({ roomCode }).populate("participants", "username"); // Fetch participants details if needed
        if (!room) return next(createError(404, "Room not found"));

        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
};

// Controller for ending a room
export const endRoom = async (req, res, next) => {
    const { roomCode } = req.params;

    try {
        const room = await Room.findOneAndUpdate(
            { roomCode, createdBy: req.user.id },
            { isActive: false },
            { new: true }
        );
        if (!room) return next(createError(404, "Room not found or you're not authorized"));

        res.status(200).json({ message: "Room ended successfully" });
    } catch (err) {
        next(err);
    }
};
