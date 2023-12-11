import { Router } from "express";
import {
  registerValidator,
  loginValidation,
  postValidation,
} from "../validations/validations.js";
import { register, login, userme } from "../controllers/autch.js";
import { checkAutch } from "../utils/checkAutch.js";
import { create, getAll, getOne, remove, update } from "../controllers/post.js";
const autchrouter = new Router();

// autch
//http://localhost:3005/api/autch/register
autchrouter.post("/register", registerValidator, register);
autchrouter.post("/login", loginValidation, login);
autchrouter.get("/me", checkAutch, userme);

// posts
autchrouter.get("/posts", getAll);
autchrouter.get("/posts/:id", getOne);
autchrouter.post("/posts", checkAutch, postValidation, create);
autchrouter.delete("/posts/:id", checkAutch, remove);
autchrouter.patch("/posts/:id", checkAutch, update);

export default autchrouter;
