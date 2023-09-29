//mongodb+srv://test:<password>@cluster0.oymhy5g.mongodb.net/
//mongodb+srv://test:test123@cluster0.oymhy5g.mongodb.net/
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; //что можно было делать запросы с разных api-адресов
// import router from

const app = express();

dotenv.config();
// cosntants
const PORT = process.env.PORT || 3002;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.oymhy5g.mongodb.net/${DB_NAME}`;

// middleware дополняют или расширяют базовые настройки express
app.use(express.json()); // для отображения в формате json
app.use(cors()); //таким образом мы сможем отправлять на backend с разных api-адресов
// app.use();

async function connect() {
  try {
    await mongoose.connect(URL);
    app.listen(PORT, () => {
      console.log(`Server OK ${PORT}`);
    });
  } catch (error) {
    console.log(`Mongoose connect ${error}`);
  }
}

connect();