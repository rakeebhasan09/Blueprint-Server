import express from "express";
import { UserController } from "../controllers/user.controller";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);

export const UserRoutes = router;
