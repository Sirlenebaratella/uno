import { prisma } from "../db/prisma";
import bcrypt from "bcrypt";
import express from "express";

export const atualizarDados = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuario)
      return res.status(404).json({ erro: "Usuário não encontrado" });

    if (nome) usuario.nome = nome;
    if (email) usuario.email = email;
    if (senha) usuario.senha = bcrypt.hashSync(senha, 10);

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id },
      data: {
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha
      },
      select: {
        id: true,
        nome: true,
        email: true,
        senha: false,
        cargos: true,
      },
    });

    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
