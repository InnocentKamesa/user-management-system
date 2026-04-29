import { getAllUsers } from "../controllers/admin.controller";
import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { isAdmin } from "../permissions/isAdmin";

const adminRouter = express.Router();

adminRouter.get("/users", authenticateToken, isAdmin, getAllUsers);

export default adminRouter;