import express from "express";
import {
  adicionarCargo,
  atualizarDados,
  listarUsuarios,
  removerCargo,
  removerUsuario,
} from "../controllers/usuarios.controller";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { isOwner } from "../middlewares/isOwner";
import { isAuthorized } from "../middlewares/isAuthorized";

export default (router: express.Router) => {
  router.patch(
    "/usuarios/atualizar-dados/:id",
    isLoggedIn,
    isOwner,
    atualizarDados
  );
  router.patch(
    "/usuarios/adicionar-cargo/:id",
    isLoggedIn,
    isAuthorized("ADMIN"),
    adicionarCargo
  );
  router.patch(
    "/usuarios/remover-cargo/:id",
    isLoggedIn,
    isAuthorized("ADMIN"),
    removerCargo
  );

  router.delete(
    "/usuarios/remover-usuario/:id",
    isLoggedIn,
    isAuthorized("ADMIN"),
    removerUsuario
  );

  router.get(
    "/usuarios/listar-usuarios",
    isLoggedIn,
    isAuthorized("ADMIN"),
    listarUsuarios
  );
};
