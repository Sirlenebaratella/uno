import express from "express";
import { registrar, login } from "../controllers/autenticacao.controller";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { isAuthorized } from "../middlewares/isAuthorized";

export default (router: express.Router) => {
  router.post("/auth/registrar", isLoggedIn, isAuthorized("ADMIN"), registrar);
  router.post("/auth/login", login);
};
