import express from "express";
import { AllUsers, login, logout, signin } from "../controllers/userController.js";
import secureUser from "../middlewares/SecureUser.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/login", login);
router.post("/logout", logout);
router.get("/AllUsers",secureUser, AllUsers);

export default router;
