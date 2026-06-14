import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./src/routers/auth.router.js";
import userRouter from "./src/routers/user.router.js";
import adminRouter from "./src/routers/admin.router.js";

dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173", "https://kamesa-user-management.vercel.app"],
    credentials: true,
  }),
);
app.use("/auth/", authRouter);
app.use("/user/", userRouter);
app.use("/admin/", adminRouter);
app.use((err, req, res, next) => {
    console.log("Internal server error:", err);
    return res.status(500).json({success:false, message:"Encountered an error in the system"});
});

export default app;
