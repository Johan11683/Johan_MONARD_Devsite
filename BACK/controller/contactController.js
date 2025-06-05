import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Cache temporaire anti-doublons (évite double clics)
const messageCache = new Set();

export const sendContactMail = async (req, res) => {
  const { email, subject, message } = req.body;

  // Anti-doublon simple (durée de vie 10 secondes)
  const cacheKey = `${email}-${subject}-${message}`;
  if (messageCache.has(cacheKey)) {
    return res.status(429).json({ error: "Message déjà en cours de traitement." });
  }

  messageCache.add(cacheKey);
  setTimeout(() => messageCache.delete(cacheKey), 10_000);

  // Vérification des champs
  if (!email || !subject || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    console.log("📨 Envoi d'un mail depuis le back avec :", { email, subject, message });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // Gmail (avec mot de passe d’appli)
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `[Punch.Dev] ${subject}`,
      text: `Message de ${email} :\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Message envoyé avec succès." });
  } catch (err) {
    console.error("❌ Erreur lors de l'envoi du mail :", err);
    return res.status(500).json({ error: "Erreur lors de l'envoi du message." });
  }
};
