import { body, validationResult } from "express-validator";
import { CATEGORIES, PRIORITIES, STATUSES } from "../utils/constants.js";

const ticketValidationRules = [
  body("subject").trim().notEmpty().withMessage("Subject is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("category").isIn(CATEGORIES).withMessage("Invalid category"),
  body("priority").isIn(PRIORITIES).withMessage("Invalid priority"),
];

const commentValidationRules = [
  body("text").trim().notEmpty().withMessage("Comment text is required"),
];

const updateTicketValidationRules = [
  body("subject").optional().trim().notEmpty().withMessage("Subject cannot be empty"),
  body("description").optional().trim().notEmpty().withMessage("Description cannot be empty"),
  body("category").optional().isIn(CATEGORIES).withMessage("Invalid category"),
  body("priority").optional().isIn(PRIORITIES).withMessage("Invalid priority"),
  body("status").optional().isIn(STATUSES).withMessage("Invalid status"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

export {
  ticketValidationRules,
  commentValidationRules,
  updateTicketValidationRules,
  validate,
};
