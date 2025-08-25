import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import helmet from "helmet";

dotenv.config();
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post("/send-code", async (req, res) => {
  const { code } = req.body;
  try {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: `Your OTP code is: ${code}`,
    });
    res.status(200).send("OTP sent via Telegram!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending OTP");
  }
});

app.get("/", (req, res) => {
  res.send("Telegram OTP Service Running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
