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
  let category = "";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal Weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";
  res
    .status(200)
    .json({ message: "success", Result: bmi.toFixed(2), category: category });
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
  const { _id } = req.authUser;
  const bmi = weight / ((height / 100) * (height / 100));
  let category = "";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal Weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";
  const new_bmi = await calculations.create({
    weight,
    height,
    Result: bmi,
    category: category,
    user_id: _id,
  });
  res.status(200).json({
    message: "success",
    Result: new_bmi.Result.toFixed(2),
    category: new_bmi.category,
  });
};

export const bmi_history = async (req, res, next) => {
  const { _id } = req.authUser;
  const all_history = await calculations.find({ user_id: _id });
  if (!all_history) {
    return next(
      new Error_handler_class("no data is found", 400, "bmi_history api")
    );
  }
  res.status(200).json({ message: "All Bmi found", Data: all_history });
};
export const delete_bmi = async (req, res, next) => {
  const { user_id } = req.params;
  const { _id } = req.authUser;
  const bmi_exists = await calculations.findOneAndDelete({
    _id: user_id,
    user_id: _id,
  });
  if (!bmi_exists) {
    return next(
      new Error_handler_class("no data is found", 400, "delete_bmi api")
    );
  }
  res.status(200).json({ message: "Bmi deleted successfully" });
};
