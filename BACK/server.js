import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(helmet());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://johan-monard-devsite.vercel.app",
    ],
    methods: ["POST"],
  })
);

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Trop de requêtes. Réessaye plus tard.",
});
app.use("/api/contact", limiter);

app.use(express.json());
app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
