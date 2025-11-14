import { Router } from "express";
import * as calculate_controller from "./calculate.controller.js";
import { error_handle } from "../../middlewares/error.handle.middleware.js";
import { auth } from "../../middlewares/auth_middleware.js";
const calculate_router = Router();

calculate_router.post(
  "/calculate_guest",
  error_handle(calculate_controller.calculate_bmi_guest)
);
calculate_router.post(
  "/calculate_user",
  auth(),
  error_handle(calculate_controller.calculate_bmi_user)
);
calculate_router.get(
  "/history",
  auth(),
  error_handle(calculate_controller.bmi_history)
);
calculate_router.delete(
  "/delete",
  auth(),
  error_handle(calculate_controller.delete_bmi)
);

export default calculate_router;
