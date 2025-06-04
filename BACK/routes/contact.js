import express from "express";
import { check, validationResult } from "express-validator";
import { sendContactMail } from "../controller/contactController.js";

const router = express.Router();

// Middleware de validation + sanitization
const validateContact = [
  check("email")
    .trim()
    .escape()
    .isEmail().withMessage("Email invalide.")
    .isLength({ max: 50 }).withMessage("Email trop long."),

  check("subject")
    .trim()
    .escape()
    .notEmpty().withMessage("Le sujet est requis.")
    .isLength({ max: 100 }).withMessage("Sujet trop long."),

  check("message")
    .trim()
    .escape()
    .notEmpty().withMessage("Le message est requis.")
    .isLength({ max: 5000 }).withMessage("Message trop long."),
];

// Test route (optionnelle)
router.get("/", (req, res) => {
  res.status(200).json({ message: "Contact route OK" });
});

// Route POST avec validation
router.post("/", validateContact, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  // Tout est OK => envoi du mail
  sendContactMail(req, res);
});

export default router;
