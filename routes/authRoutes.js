import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { loginUserValidate } from "../middlewares/user.validation.middleware.js";

const router = Router();

router.post(
  "/login", loginUserValidate, (req, res, next) => {
    try {
      if (!res.err) {
        res.data = authService.login(req.body);
      }
    } catch (err) {
      res.err = err;
    } finally {
      next();
      
    }
  },
  responseMiddleware
);

export { router };
