import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet"; // ✅ Ajout ici
import rateLimit from "express-rate-limit";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Sécurité : Helmet pour sécuriser les headers HTTP
app.use(helmet());

// ✅ CORS (origines autorisées)
app.use(
  cors({
    origin: ["http://localhost:3000", "https://ton-site.vercel.app"],
    methods: ["POST"],
  })
);

// ✅ Protection brute-force
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: "Trop de requêtes. Réessaye plus tard.",
});
app.use("/api/contact", limiter);

// ✅ Lecture JSON
app.use(express.json());

// ✅ Routes
app.use("/api/contact", contactRoutes);

// ✅ Lancement du serveur
app.listen(PORT, () => {
  console.log(`API lancée sur le port ${PORT}`);
});
