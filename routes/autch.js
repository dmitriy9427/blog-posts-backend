import { Router } from "express";
import {} from "../controllers/autch.js";

const router = new Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// user me
router.post("/register", userme);
