import express from "express";
import { registerUser ,login,LogOut, sendOTP, verifyOTP, resetPassword, googleAuth} from "../controllers/authController.js";
const authRouter=express.Router();

authRouter.post("/signup",registerUser);
authRouter.post("/login",login);
authRouter.get("/logout",LogOut);
authRouter.post("/sendotp",sendOTP);
authRouter.post("/verifyotp",verifyOTP);
authRouter.post("/resetpassword",resetPassword);
authRouter.post("/googleauth",googleAuth);

export default authRouter;