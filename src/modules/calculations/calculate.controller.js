import { calculations } from "../../../DB/models/calculate.model.js";
import { Error_handler_class } from "../../utils/error-class.utils.js";

export const calculate_bmi_guest = async (req, res, next) => {
  const { weight, height } = req.body;
  if (!weight || !height) {
    return next(
      new Error_handler_class(
        "please enter weight and height",
        400,
        "calculate bmi api"
      )
    );
  }
  const bmi = weight / ((height / 100) * (height / 100));
  res.status(200).json({ message: "success", Data: bmi });
};
export const calculate_bmi_user = async (req, res, next) => {
  const { weight, height } = req.body;
  if (!weight || !height) {
    return next(
      new Error_handler_class(
        "please enter weight and height",
        400,
        "calculate bmi api"
      )
    );
  }
  const { user_id } = req.authUser;
  const bmi = weight / ((height / 100) * (height / 100));
  const new_bmi = await calculations.create({
    weight,
    height,
    Result: bmi,
    user_id: user_id,
  });
  res.status(200).json({ message: "success", Data: new_bmi });
};

export const bmi_history = async (req, res, next) => {
  const { user_id } = req.authUser;
  const all_history = await calculations.find({ _id: user_id });
  if (!all_history) {
    return next(
      new Error_handler_class("no data is found", 400, "bmi_history api")
    );
  }
  res.status(200).json({ message: "All Bmi found", Data: all_history });
};
