import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import secureUser from "../middlewares/SecureUser.js"

const router = express.Router();

router.post("/send/:id", secureUser, sendMessage);
router.get("/get/:id", secureUser, getMessage);

export default router;
