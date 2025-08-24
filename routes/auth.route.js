import { Router } from "express";
import * as authController from "../controller/auth.controller.js"


const router = Router();

router.route("/register")
  .get(authController.getRegistrationPage)
  .post(authController.postRegistrationPage);


router.route("/login")
  .get(authController.getLoginPage).
  post(authController.postLogin);

router.route("/logout").get(authController.logoutUser);

export const authRoute = router;