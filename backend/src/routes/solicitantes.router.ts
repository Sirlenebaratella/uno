import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { isAuthorized } from "../middlewares/isAuthorized";
import { cadastrarSolicitante } from "../controllers/solicitante.controller";

export default (router: express.Router) => {
  router.post(
    "/solicitantes/cadastrar-solicitante",
    isLoggedIn,
    isAuthorized("ADMIN", "Vendedor"),
    cadastrarSolicitante
  );
};
