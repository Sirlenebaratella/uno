import express from "express";
import { registrar, login } from "../controllers/autenticacao.controller";
import { isLoggedIn } from "../middlewares/isLoggedIn";

export default (router: express.Router) => {
  router.post("/auth/registrar", isLoggedIn, registrar);
  router.post("/auth/login", login);
};
