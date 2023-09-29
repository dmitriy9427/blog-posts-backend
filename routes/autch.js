import { Router } from "express";
import { register, login, userme } from "../controllers/autch.js";
import { checkAutch } from "../utils/checkAutch.js";
const autchrouter = new Router();

// Register
//http://localhost:3005/api/autch/register
autchrouter.post("/register", register);

// Login
autchrouter.post("/login", login);

// user me
autchrouter.post("/me", checkAutch, userme);

export default autchrouter;
