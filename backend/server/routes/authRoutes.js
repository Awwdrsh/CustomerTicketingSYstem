import { Router } from "express";
import { registerRules, loginRules, validate } from "../validators/authValidators.js";
import { register, login, getMe } from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post("/register", registerRules, validate, register);
router.post("/login", loginRules, validate, login);
router.get("/me", authenticate, getMe);

export default router;
