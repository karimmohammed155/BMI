import joi from "joi";

export const register_schema = joi.object({
  username: joi.string().min(2).max(25).required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)
    .message(
      "The password must be at least 8 characters and contain one lowercase , one uppercase and one special case"
    )
    .required(),
  confirm_password: joi.string().valid(joi.ref("password")).required(),
});

export const login_schema = joi
  .object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .min(1)
      .message("The password cannot be empty")
      .required(),
  })
  .required();
