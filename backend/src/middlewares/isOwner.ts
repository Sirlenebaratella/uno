import express from "express";
import { prisma } from "../db/prisma";

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { usuarioLogado } = req.body;
  const { id } = req.params;

  const usuario = await prisma.usuario.findUnique({
    where: { id },
  });

  if (usuario?.id !== usuarioLogado)
    return res
      .status(403)
      .json("Você não tem permissão para editar esse usuário!");

  next();
};
