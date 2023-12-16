//mongodb+srv://test:<password>@cluster0.oymhy5g.mongodb.net/
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; //что можно было делать запросы с разных api-адресов
import multer from "multer";
import autchrouter from "./routes/routes.js";
import { checkAutch } from "./utils/checkAutch.js";

const app = express();

dotenv.config();
// cosntants
const PORT = process.env.PORT || 8889;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

// middleware дополняют или расширяют базовые настройки express
app.use(express.json()); // для отображения в формате json
app.use(cors()); //таким образом мы сможем отправлять на backend с разных api-адресов
app.use("/api/", autchrouter);

const storage = multer.diskStorage({
  destination: (_, __, callack) => {
    callack(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/uploads", checkAutch, upload.single("image"), (req, res) => {
  res.json({
    url: `/api/uploads/${req.file.originalname}`,
  });
});

app.use("/api/uploads", express.static("uploads"));

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    app.listen(PORT, () => {
      console.log(`Server OK ${PORT}`);
    });
  } catch (error) {
    console.log(`Mongoose connect ${error}`);
  }
}

connect();
