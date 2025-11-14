import jwt from "jsonwebtoken";
import { user } from "../../DB/models/user.js";
export const auth = () => {
  return async (req, res, next) => {
    try {
      const { token } = req.headers;
      if (!token) {
        return res.status(400).json({
          message: "please sign_in first , there is no token generated",
        });
      }
      if (!token.startsWith(process.env.BEARER)) {
        return res.status(400).json({
          message: "invalid token",
        });
      }
      const original_token = token.split(" ")[1];
      const decoded_data = jwt.verify(original_token, process.env.SIGNATURE);
      if (!decoded_data?.user_id) {
        return res.status(400).json({
          message: "invalid token payload",
        });
      }
      const User = await user
        .findById(decoded_data.user_id)
        .select("-password");
      if (!User) {
        return res.status(404).json({
          message: "user not found",
        });
      }
      req.authUser = User;
      next();
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  };
};
