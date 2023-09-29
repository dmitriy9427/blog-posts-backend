import { Router } from "express";
import { register, login, userme } from "../controllers/autch.js";

const autchrouter = new Router();

// Register
//http://localhost:3005/api/autch/register
autchrouter.post("/register", register);

// Login
autchrouter.post("/login", login);

// user me
autchrouter.post("/me", userme);

export default autchrouter;
