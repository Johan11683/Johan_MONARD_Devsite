import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Cache global pour éviter les doublons (hors handler !)
const messageCache = new Set();

export const sendContactMail = async (req, res) => {
  const { email, subject, message } = req.body;

  console.log("📨 Nouvelle tentative d’envoi :");
  console.log("📧 Email :", email);
  console.log("📝 Sujet :", subject);
  console.log("🗒️ Message :", message);

  if (!email || !subject || !message) {
    console.warn("⚠️ Champs manquants !");
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  const cacheKey = `${email}-${subject}-${message}`;

  if (messageCache.has(cacheKey)) {
    console.warn("⛔ Message déjà traité récemment (cacheKey match).");
    return res.status(429).json({ error: "Message déjà en cours de traitement." });
  }

  // Ajoute au cache
  messageCache.add(cacheKey);
  setTimeout(() => {
    messageCache.delete(cacheKey);
    console.log("🧹 Cache nettoyé pour :", cacheKey);
  }, 10_000);

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
    console.log("✅ Email envoyé :", info.messageId);

    return res.status(200).json({ message: "Message envoyé avec succès." });
  } catch (err) {
    console.error("❌ Erreur nodemailer :", err);
    return res.status(500).json({ error: "Erreur lors de l'envoi du message." });
  }
};
