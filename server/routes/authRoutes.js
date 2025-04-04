import express from "express";
import {
  loginAuth,
  signupAuth,
  verifyUser,
  logoutUser,
} from "../controller/authController.js";

import registerMiddleware from "../middlewares/regsiterMiddleware.js";
import LoginMiddleware from "../middlewares/loginMiddleware.js";
import AuthUserMiddleware from "../middlewares/authUserMiddleware.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/register", registerMiddleware, signupAuth); //register route
AuthRoutes.post("/login", LoginMiddleware, loginAuth); //login route
AuthRoutes.get("/auth-user", AuthUserMiddleware, verifyUser); //verifying the user
AuthRoutes.delete("/logout", logoutUser); //logout the user
export default AuthRoutes;
