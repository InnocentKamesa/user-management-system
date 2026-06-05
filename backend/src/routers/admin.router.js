import { getAllUsers } from "../controllers/admin.controller.js";
import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../permissions/isAdmin.js";

const adminRouter = express.Router();

adminRouter.get("/users", authenticateToken, isAdmin, getAllUsers);

export default adminRouter;