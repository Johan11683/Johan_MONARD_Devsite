import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendContactMail = async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    const transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `[Punch.Dev] ${subject}`,
      text: `Message de ${email} :\n\n${message}`,
    };

    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message envoyé avec succès." });
  } catch (err) {
    console.error("❌ Erreur lors de l'envoi :", err);
    res.status(500).json({ error: "Erreur lors de l'envoi du message." });
  }
};
