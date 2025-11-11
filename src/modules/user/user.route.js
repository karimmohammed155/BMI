import { Router } from "express";
import * as user_controller from "./user.controller.js";
import { validation } from "../../middlewares/validation_middleware.js";
import { login_schema, register_schema } from "./user.schema.js";
import { error_handle } from "../../middlewares/error.handle.middleware.js";
const user_router = Router();

user_router.post(
  "/register",
  validation(register_schema),
  error_handle(user_controller.register)
);
user_router.post(
  "/login",
  validation(login_schema),
  error_handle(user_controller.login)
);

export default user_router;
